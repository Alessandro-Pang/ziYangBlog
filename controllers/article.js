/*
 * @Author: zi.yang
 * @Date: 2020-06-19 21:45:59
 * @LastEditTime: 2020-07-05 23:12:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\controllers\article.js
 */

const express = require("express");
const router = express.Router();
const Article = require("../services/Article");

router.get("/info", function (req, res) {
  Article.findArticleInfo((status) => {
    res.json(status);
  });
});

router.get("/find", function (req, res) {
  Article.findArticleById(req.query.article_id, (status) => {
    res.json(status);
  });
});

router.post("/add", function (req, res) {
  Article.addArticle(req.query, (status) => {
    res.json(status);
  });
});

router.delete("/delete",function(req,res){
  Article.deleteArticle(req.query.id,(status)=>{
    res.json(status)
  })
});

router.get("/addLike",function(req,res){
  Article.addLike(req.query.id,(status)=>{
    res.json(status)
  })
})

router.get("/findTagList",function(req,res){
  Article.findAllTagList((status)=>{
    res.json(status)
  })
})

router.get("/findFiling",function(req,res){
  Article.findArticleFiling((status)=>{
    res.json(status)
  })
})

router.get("/findHotArticle",function(req,res){
  Article.findHotArticleList((status)=>{
    res.json(status)
  })
})

router.get("/findArticelList",function(req,res){
  const {typename,typeValue} = req.query;
  Article.findArticleListByInput(typename,typeValue,(status)=>{
    res.json(status)
  })
})
module.exports = router;
