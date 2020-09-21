/*
 * @Author: zi.yang
 * @Date: 2020-06-27 20:47:38
 * @LastEditTime: 2020-06-27 22:13:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\services\Menu.js
 */

const Menu = require("../models/menu");
exports.findMenuInfo = async (cb) => {
  try {
    const menus = await Menu.findAll();
    return cb({ code: 200, msg: "succes", data: menus });
  } catch (e) {
    console.log(e);
    return cb({ code: 400, msg: "error", data: [] });
  }
};

exports.findMenuById = async (menu_id, cb) => {
  try {
    const menu = await Menu.findOne({ where: { menu_id } });
    return cb({ code: 200, msg: "succes", data: menu });
  } catch (e) {
    console.log(e);
    return cb({ code: 400, msg: "error", data: [] });
  }
};

exports.addMenu = async (menuInfo,cb)=>{
  try{
    await Menu.created(menuInfo);
    return cb({ code: 200, msg: "success" });
  } catch (e) {
    console.log(e);
    return cb({ code: 400, msg: "error" });
  }
}

exports.deleteMenu = async (menu_id,cb) =>{
  try {
    const menu = await Menu.findOne({ where: { menu_id } });
    if (!menu) {
      return cb({ code: 422, msg: "find menu error" });
    }
    try {
      await menu.destroy();
      return cb({ code: 200, msg: "success" });
    } catch (e) {
      return cb({ code: 500, msg: "delete error" });
    }
  } catch (e) {
    console.log(e);
    return cb({ code: 500, msg: "error" });
  }
}