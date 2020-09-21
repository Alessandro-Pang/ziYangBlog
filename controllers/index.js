/*
 * @Author: zi.yang
 * @Date: 2020-06-18 00:40:05
 * @LastEditTime: 2020-06-27 22:35:09
 * @LastEditors: Please set LastEditors
 * @Description: router
 * @FilePath: \ziYangBlog\controllers\index.js
 */

const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/article", require("./article"));
router.use("/menu", require("./menu"));

module.exports = router;
