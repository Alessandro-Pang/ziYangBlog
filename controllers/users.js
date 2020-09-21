/*
 * @Author: zi.yang
 * @Date: 2020-06-18 00:40:05
 * @LastEditTime: 2020-06-20 00:03:01
 * @LastEditors: Please set LastEditors
 * @Description: router
 * @FilePath: \ziYangBlog\controllers\users.js
 */

const express = require("express");
const router = express.Router();
const User = require("../services/User");

router.get("/info", function (req, res) {
  User.findUserInfo(function (status) {
    res.json(status);
  });
});

router.post("/login", function (req, res) {
  const { username, password } = req.body;
  User.findUserForLogin(username, password, (status) => {
    res.json(status);
  });
});

router.post("/add", function (req, res) {
  User.addUser(req.body,(status)=>{
    res.json(status)
  })
});

router.put("/update",function(req,res){
  const { user_id,username } = req.body;
  User.updatedUser(user_id,username,(status)=>{
    res.json(status)
  })
});

router.get("/delete",function(req,res){
  User.deleteUser(req.body.user_id,(status)=>{
    res.json(status)
  })
})

module.exports = router;
