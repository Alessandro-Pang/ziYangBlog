/*
 * @Author: zi.yang
 * @Date: 2020-06-18 22:41:50
 * @LastEditTime: 2020-06-19 01:00:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\utils\encryption.js
 */ 
const crypto = require("crypto");

class encryption {
  $md5(plaintext){
    const md5 = crypto.createHash("md5");
    const ciphertext = md5.update(plaintext).digest("base64");
    return ciphertext;
  }
  $sha1(plaintext){
    const shasum = crypto.createHash('sha1');
    const ciphertext = shasum.update(plaintext).digest('hex');
    return ciphertext;
  }
  $hmac(plaintext,secrectKey){
    // Hmac算法：HMAC运算利用哈希算法，以一个密钥和一个消息为输入，生成一个消息摘要作为输出
    const hmac = crypto.createHmac('sha1', secrectKey);
    const ciphertext = hmac.update(plaintext).digest('hex');
    return ciphertext;
  }
}
module.exports = encryption;