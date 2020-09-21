/*
 * @Author: zi.yang
 * @Date: 2020-06-18 12:14:40
 * @LastEditTime: 2020-06-27 21:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\services\User.js
 */
// const { Op } = require("sequelize");
const User = require("../models/users");
const encryption = require("../utils/encryption");
const ep = new encryption();

/**
 * @description:  获取所有用户信息
 * @param {function} cb
 * @return: cb()
 */
exports.findUserInfo = async function (cb) {
  try {
    const userInfo = await User.findAll();
    return cb({ code: 200, msg: "success", data: userInfo });
  } catch (e) {
    console.log(e);
    return cb({ code: 500, msg: "error", data: [] });
  }
};

/**
 * @description: 登录用户查询
 * @param {string} username
 * @param {string} password
 * @return: cb
 */
exports.findUserForLogin = async function (username, password, cb) {
  try {
    //检索用户
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return cb({ code: 422, msg: "user input error", data: [] });
    }
    //验证用户密码
    const salt = user.salt;
    const cryptogram = ep.$sha1(ep.$md5(password) + salt);
    const isCorrect = user.password === cryptogram;
    //如果验证失败，返回错误
    if (isCorrect) {
      return cb({ code: 200, msg: "success", data: user });
    } else {
      console.log(e);
      return cb({ code: 422, msg: "user input error", data: [] });
    }
  } catch (e) {
    //未知异常
    console.log(e);
    return cb({ code: 500, msg: "error", data: [] });
  }
};

/**
 * @description:添加新用户
 * @param {Object} userInfo
 * @param {Function}cb
 * @return:cb
 */
exports.addUser = async function (userInfo, cb) {
  //TODO: 需要处理检索 参数
  try {
    await User.create(userInfo);
    return cb({ code: 200, msg: "success" });
  } catch (e) {
    console.log(e);
    return cb({ code: 400, msg: "error" });
  }
};

/**
 * @description:根据ID 更新用户
 * @param {Number}user_id
 * @param {String}username
 * @param {Function}cb
 * @return:cb
 */
exports.updatedUser = async function (user_id, username, cb) {
  try {
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      return cb({ code: 422, msg: "find user error" });
    }
    try {
      user.username = username;
      await user.save();
      return cb({ code: 200, msg: "success" });
    } catch (e) {
      console.log(e);
      return cb({ code: 500, msg: "update error" });
    }
  } catch (e) {
    console.log(e);
    return cb({ code: 500, msg: "error" });
  }
};

/**
 * @description:根据ID删除用户
 * @param {Number}user_id
 * @param {Function}cb
 * @return:cb
 */
exports.deleteUser = async function (user_id, cb) {
  try {
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      return cb({ code: 422, msg: "find user error" });
    }
    try {
      await user.destroy();
      return cb({ code: 200, msg: "success" });
    } catch (e) {
      console.log(e);
      return cb({ code: 500, msg: "delete error" });
    }
  } catch (e) {
    console.log(e);
    return cb({ code: 500, msg: "error" });
  }
};
