/*
 * @Author: zi.yang
 * @Date: 2020-07-03 08:03:21
 * @LastEditTime: 2020-07-03 10:18:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\utils\markdown.js
 */
const Marked = require("marked");

// Set options
// `highlight` example uses `highlight.js`
Marked.setOptions({
  renderer: new Marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: function (code) {
    return require("highlight.js/lib/core").highlightAuto(code).value;
  },
});

module.exports = (article) => Marked(article);
