/*
 * @Author: zi.yang
 * @Date: 2020-06-19 12:57:17
 * @LastEditTime: 2020-07-01 17:20:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\articleInfo.js
 */

const { DataTypes } = require("sequelize");
const moment = require("moment");
const db = require("./db");

const articleInfoConfig = {
  article_id: { type: DataTypes.INTEGER, primaryKey: true },
  article_author: { type: DataTypes.STRING },
  article_author_id: { type: DataTypes.INTEGER },
  article_title: { type: DataTypes.STRING },
  article_intro: { type: DataTypes.STRING },
  article_details: { type: DataTypes.TEXT },
  tag_name: {
    field: "article_tag_name",
    type: DataTypes.STRING,
  },
  createdAt: {
    field: "article_create_date",
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue("createdAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
  },
  updatedAt: {
    field: "article_update_date",
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue("updatedAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
  },
  article_cover: { type: DataTypes.STRING },
  pageview: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER },
  dislike: { type: DataTypes.INTEGER },
};

const ArticleInfo = db.define("v_article_info", articleInfoConfig, {
  timestamps: false,
  freezeTableName: true,
  tableName: "v_article_info",
  indexes: [
    {
      unique: true,
      fields: ["article_author", "article_author_id", "article_tag_name"],
    },
  ],
});

module.exports = ArticleInfo;
