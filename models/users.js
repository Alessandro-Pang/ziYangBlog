/*
 * @Author: zi.yang
 * @Date: 2020-06-18 10:30:12
 * @LastEditTime: 2020-06-30 10:28:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\users.js
 */

const { Sequelize, DataTypes } = require("sequelize");
const moment = require("moment");
const db = require("./db");
const encryption = require("../utils/encryption");
const ep = new encryption();

const userConfig = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      is: {
        args:/^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){4,19}$/,
        msg:"仅允许5-20位，英文加数字 `.` ,`_`,`-`"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    
    set(value){
      const salt = this.getDataValue("salt");
      const eppwd = ep.$sha1(ep.$md5(value)+salt);
      this.setDataValue('password', eppwd);
    }
  },
  salt:{
    type:DataTypes.STRING,
    defaultValue:Math.random().toString(36).substr(2),
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true,
    }
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue("birthday")).format("YYYY-MM-DD");
    },
    set(value){
      this.setDataValue("birthday",moment(value).format("YYYY-MM-DD"))
    }
  },
  sex: {
    type: DataTypes.STRING,
    validate:{
      isIn: {
        args: [["男", "女", "保密"]],
        msg: "性别必须是三者之一：`男`,`女`,`保密`",
      },
    },
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate:{
     is: {
       args:/^\d{11}$/,
       msg:"手机号必须是11位数字"
     }
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "create_date",
    get() {
      return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss");
    },
    set(value){
      this.setDataValue("createdAt",moment(value).format("YYYY-MM-DD HH:mm:ss"))
    },
    // 在插入时填充当前时间
    defaultValue: Sequelize.NOW,
  },
};

// 定义模型属性
const User = db.define("tb_users_info", userConfig, {
  // 默认返回表名 是模型名的复数 user -> users
  // 去除createAt updateAt
  timestamps: true,
  updatedAt:false,
  // 强制表名称等于模型名称
  freezeTableName: true,
  // 直接提供表名
  tableName:'tb_users_info',
  // 在上面的属性中使用 `unique: true` 与在模型的参数中创建索引完全相同：
  indexes: [{ unique: true, fields: ['role_id'] }]
});

module.exports = User;
