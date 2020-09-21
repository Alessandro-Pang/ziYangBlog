/*
 * @Author: zi.yang
 * @Date: 2020-06-28 20:33:17
 * @LastEditTime: 2020-06-28 20:57:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\utils\getIPAdress.js
 */
const os = require("os");

class GetIPAdress {
  getLocalAdress() {
    if (localIp) return localIp;
    let localIPAddress = "";
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
      let iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
          alias.family === "IPv4" &&
          alias.address !== "127.0.0.1" &&
          !alias.internal
        ) {
          localIPAddress = alias.address;
        }
      }
    }
    localIp = localIPAddress;
    return localIPAddress;
  }

  getClientIp(req) {
    let ip =
      req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
      req.ip ||
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress;

    if (ip.split(",").length > 0) {
      ip = ip.split(",")[0];
    }
    return ip.replace('::ffff:','');
  };
}

module.exports = GetIPAdress;