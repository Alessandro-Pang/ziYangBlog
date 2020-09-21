/*
 * @Author: zi.yang
 * @Date: 2020-06-27 19:28:24
 * @LastEditTime: 2020-06-30 10:27:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\menu.js
 */

const { Sequelize, DataTypes } = require("sequelize");
const moment = require("moment")
const db = require("./db");

const menuConfig = {
  menu_id: {
    type: DataTypes.STRING,
    autoIncrement: true,
    primaryKey: true,
  },
  menu_name: { type: DataTypes.STRING, allowNull: false, unique: true },
  parent_id: { type: DataTypes.STRING, allowNull: false },
  icon: { type: DataTypes.STRING, allowNull: false },
  href: { type: DataTypes.STRING, allowNull: false },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "create_date",
    get() {
      return moment(this.getDataValue("createdAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    set(value) {
      this.setDataValue(
        "createdAt",
        moment(value).format("YYYY-MM-DD HH:mm:ss")
      );
    },
    defaultValue: Sequelize.Now,
  },
  create_user_name: { type: DataTypes.STRING, allowNull: false },
  create_user_id: { type: DataTypes.INTEGER, allowNull: false },
  sorting: { type: DataTypes.INTEGER, allowNull: false },
};

const Menu = db.define("tb_menus", menuConfig, {
  timestamps: true,
  updatedAt: false,
  freezeTableName: true,
  index: [{ unique: true }],
});

module.exports = Menu;
