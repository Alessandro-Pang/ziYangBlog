/*
 * @Author: zi.yang
 * @Date: 2020-06-19 12:57:17
 * @LastEditTime: 2020-09-21 11:56:53
 * @LastEditors: zi.yang
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\article.js
 */

const { Sequelize, DataTypes } = require("sequelize");
const moment = require("moment");
const db = require("./db");
const User = require("./users");
const ArticleLikes = require("../models/article_likes");
const ArticlePageView = require("../models/article_pageview");

const articleconfig = {
  article_id: {
    field: "id",
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  article_author_id: {
    field: "author_id",
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  article_title: {
    field: "title",
    type: DataTypes.STRING,
    allowNull: false,
  },
  article_intro: {
    field: "intro",
    type: DataTypes.STRING,
    allowNull: false,
  },
  article_details: {
    field: "content",
    type: DataTypes.TEXT,
    allowNull: false,
  },
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
  tag_name: {
    field: "tag_name",
    type: DataTypes.STRING,
    allowNull: false,
  },
  article_cover: {
    field: "conver",
    type: DataTypes.STRING,
    defaultValue: "",
  },
};

const Article = db.define("tb_article", articleconfig, {
  timestamps: true,
  freezeTableName: true,
  tableName: "tb_article",
  indexes: [
    {
      unique: true,
      fields: ["article_author", "article_author_id", "article_tag_name"],
    },
  ],
});
Article.hasMany(ArticleLikes, {
  foreignKey: "article_id",
});
ArticleLikes.belongsTo(Article, {
  foreignKey: "article_id",
});
Article.hasMany(ArticlePageView, {
  foreignKey: "article_id",
});
ArticlePageView.belongsTo(Article, {
  foreignKey: "article_id",
});

module.exports = Article;
