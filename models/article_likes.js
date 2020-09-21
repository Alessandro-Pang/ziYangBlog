/*
 * @Author: zi.yang
 * @Date: 2020-06-28 22:01:06
 * @LastEditTime: 2020-09-21 11:57:46
 * @LastEditors: zi.yang
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\models\article_likes.js
 */

const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");
const moment = require("moment");
const Article = require("./article");
const User = require("./users");
const articleLikesConfig = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoincrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: "article_id",
    },
  },
  likes: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^(like|dislike)$/,
        msg: "仅允许 `like` 与 `dislike` ",
      },
    },
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
};

const ArticleLikes = db.define("tb_article_likes", articleLikesConfig, {
  timestamps: true,
  updatedAt: false,
  freezeTableName: true,
  tableName: "tb_article_likes",
});

module.exports = ArticleLikes;
