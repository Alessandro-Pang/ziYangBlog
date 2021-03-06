/*
 * @Author: zi.yang
 * @Date: 2020-06-27 19:28:24
 * @LastEditTime: 2020-09-21 23:16:57
 * @LastEditors: zi.yang
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlogBackEnd\models\menu.js
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
  create_userid: { type: DataTypes.INTEGER, allowNull: false },
  sorting: { type: DataTypes.INTEGER, allowNull: false },
};

const Menu = db.define("tb_menus", menuConfig, {
  timestamps: true,
  updatedAt: false,
  freezeTableName: true,
  index: [{ unique: true }],
});

module.exports = Menu;
