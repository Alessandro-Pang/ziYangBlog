/*
 * @Author: zi.yang
 * @Date: 2020-06-28 22:01:06
 * @LastEditTime: 2020-07-09 18:54:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\article_pageview.js
 */

const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");
const moment = require("moment");
const Article = require("./article");

const articlePageViewConfig = {
  pid: { type: DataTypes.INTEGER, autoincrement: true, primaryKey: true },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: "article_id",
    },
  },
  userIP: { type: DataTypes.STRING, allowNull: false },
  createdAt: {
    field: "create_date",
    type: DataTypes.DATE,
    allowNull: false,
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
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    field: "update_date",
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue("updatedAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    set(value) {
      this.setDataValue(
        "updatedAt",
        moment(value).format("YYYY-MM-DD HH:mm:ss")
      );
    },
  },
};

const ArticlePageView = db.define("tb_article_pageview", articlePageViewConfig, {
  timestamps: true,
  freezeTableName: true,
  tableName: "tb_article_pageview",
});

module.exports = ArticlePageView;