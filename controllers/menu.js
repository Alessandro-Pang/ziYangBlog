/*
 * @Author: zi.yang
 * @Date: 2020-06-27 20:57:29
 * @LastEditTime: 2020-06-28 20:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\controllers\menu.js
 */

const express = require("express");
const router = express.Router();
const Menu = require("../services/Menu");

/**
 * const GetIPAdress = require("../utils/getIPAdress");
 * 
 *   const getIPAdress = new GetIPAdress();
      const ip = getIPAdress.getClientIp(req);
      console.log(ip)
 */
router.get("/info", (req, res) => {
  Menu.findMenuInfo((status) => {
    res.json(status);
  });
});

module.exports = router;
