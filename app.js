/*
 * @Author: zi.yang
 * @Date: 2020-06-17 23:26:26
 * @LastEditTime: 2020-09-21 10:42:59
 * @LastEditors: Please set LastEditors
 * @Description: app index
 * @FilePath: \ziYangBlog\app.js
 */ 

const express = require("express");
const app = express();
const path = require("path");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//设置跨域请求
app.all('*', function (req, res, next) {
  //指定允许其他域名访问
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:9009");
  //允许的请求头字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  //允许的请求类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //请求数据类型
  res.header("Content-Type", "application/json;charset=utf-8");
  //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
  res.header("Access-Control-Allow-Credentials",true);
  //预检结果缓存时间,缓存
  res.header("Access-Control-Max-Age",1800);
  //修改 X-Powered-By 指定版本
  res.header("X-Powered-By", 'NodeJS')
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));

// api 接口路由
app.use('/api/v1',require('./controllers'));

// catch 404 and forward to error handler
// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.write('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;