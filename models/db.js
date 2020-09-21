/*
 * @Author: zi.yang
 * @Date: 2020-06-17 23:35:05
 * @LastEditTime: 2020-06-18 14:50:29
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \ziYangBlog\models\db.js
 */

const Sequelize = require("sequelize");
const {
  database,
  username,
  password,
  host,
  port,
} = require("../config/db.config");

//初始化链接（连接池）
const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8",
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: "+08:00",
});

//验证是否连接成功
sequelize
  .authenticate()
  .then(() => {
    console.log("Success.");
  })
  .catch((err) => {
    console.error("Failed", err);
  });

module.exports = sequelize;