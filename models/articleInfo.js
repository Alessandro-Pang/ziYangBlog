/*
 * @Author: zi.yang
 * @Date: 2020-06-19 12:57:17
 * @LastEditTime: 2020-09-21 12:00:48
 * @LastEditors: zi.yang
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\articleInfo.js
 */

const { DataTypes } = require("sequelize");
const moment = require("moment");
const db = require("./db");

const articleInfoConfig = {
  article_id: { field: "id", type: DataTypes.INTEGER, primaryKey: true },
  article_author: { field: "author", type: DataTypes.STRING },
  article_author_id: { field: "author_id", type: DataTypes.INTEGER },
  article_title: { field: "title", type: DataTypes.STRING },
  article_intro: { field: "intro", type: DataTypes.STRING },
  article_details: { field: "content", type: DataTypes.TEXT },
  tag_name: {
    field: "tag_name",
    type: DataTypes.STRING,
  },
  createdAt: {
    field: "create_date",
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue("createdAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
  },
  updatedAt: {
    field: "update_date",
    type: DataTypes.DATE,
    get() {
      return moment(this.getDataValue("updatedAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
  },
  article_cover: { field: "cover", type: DataTypes.STRING },
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
