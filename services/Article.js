/*
 * @Author: zi.yang
 * @Date: 2020-06-19 13:36:36
 * @LastEditTime: 2020-09-22 00:25:12
 * @LastEditors: zi.yang
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlogBackEnd\services\Article.js
 */
const { QueryTypes, Op } = require("sequelize");
const db = require("../models/db");
const Article = require("../models/article");
const ArticleInfo = require("../models/articleInfo");
// const ArticleLikes = require("../models/article_likes");
// const ArticlePageView = require("../models/article_pageview");
const markdown = require("../utils/markdown");
const moment = require("moment");
/**
 * @description: 查询所有文章
 * @param {Function} cb callback
 * @return: callback
 */
exports.findArticleInfo = async function (cb) {
  try {
    const articleInfo = await ArticleInfo.findAndCountAll({
      attributes: [
        "article_id",
        "article_author",
        "article_title",
        "article_intro",
        "createdAt",
        "article_cover",
        "pageview",
        "likes",
      ],
      order: [["createdAt", "DESC"]],
    });
    return cb({
      code: 200,
      msg: "succes",
      data: articleInfo,
    });
  } catch (e) {
    console.log(e);
    return cb({
      code: 400,
      msg: "error",
      data: [],
    });
  }
};

/**
 * @description: 根据ID 查找文章
 * @param {Number} article_id
 * @param {Function} cb callback
 * @return: callback
 */
exports.findArticleById = async function (article_id, cb) {
  try {
    const article = await ArticleInfo.findOne({
      where: {
        article_id,
      },
      attributes: [
        "article_id",
        "article_author",
        "article_title",
        "article_details",
        "createdAt",
        "tag_name",
        "pageview",
        "likes",
      ],
    });

    article.article_details = await markdown(article.article_details);
    return cb({
      code: 200,
      msg: "success",
      data: article,
    });
  } catch (err) {
    console.log(err);
    return cb({
      code: 400,
      msg: "error",
      data: [],
      error: err,
    });
  }
};

/**
 * @description: 新增文章
 * @param {Object} article_info
 * @param {Function} cb callback
 * @return: callback
 */
exports.addArticle = async function (article_info, cb) {
  try {
    await Article.create(article_info);
    return cb({
      code: 200,
      msg: "success",
    });
  } catch (e) {
    console.log(e);
    return cb({
      code: 400,
      msg: "error",
    });
  }
};

/**
 * @description: 根据ID 删除文章
 * @param {Number} article_id
 * @return: callback
 */
exports.deleteArticle = async function (article_id, cb) {
  try {
    const article = await Article.findOne({
      where: {
        article_id,
      },
    });
    if (!article) {
      return cb({
        code: 422,
        msg: "find user error",
      });
    }
    try {
      await article.destroy();
      return cb({
        code: 200,
        msg: "success",
      });
    } catch (e) {
      return cb({
        code: 500,
        msg: "delete error",
      });
    }
  } catch (e) {
    console.log(e);
    return cb({
      code: 500,
      msg: "error",
    });
  }
};

/**
 * @description:查询所有标签，并且返回标签出现的个数
 * @param {type}
 * @return:cb
 */
exports.findAllTagList = async function (cb) {
  try {
    const tagList = await Article.findAndCountAll({
      attributes: ["tag_name"],
      group: ["tag_name"],
    });

    return cb({
      code: 200,
      msg: "success",
      data: tagList,
    });
  } catch (e) {
    console.log(e);
    return cb({
      code: 500,
      msg: "error",
      data: [],
    });
  }
};
/**
 * @description: 查询日志归档
 * @param {*} cb
 * @return:cb
 */
exports.findArticleFiling = async (cb) => {
  try {
    const filing = await db.query(
      `SELECT
        DATE_FORMAT( create_date, '%Y-%m' ) AS createdAt,
        count( 1 ) AS count 
      FROM tb_article 
      GROUP BY
        DATE_FORMAT( create_date, '%Y-%m' ) `,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );

    return cb({
      code: 200,
      msg: "success",
      data: filing,
    });
  } catch (e) {
    console.log(e);
    return cb({
      code: 500,
      msg: "error",
      data: [],
    });
  }
};

/**
 * @description: 查询所有文章
 * @param {Function} cb callback
 * @return: callback
 */
exports.findHotArticleList = async function (cb) {
  try {
    const articleInfo = await ArticleInfo.findAll({
      attributes: [
        "article_id",
        "article_author",
        "article_title",
        "createdAt",
        "pageview",
        "likes",
      ],
      offset: 0,
      limit: 10,
      order: [["pageview", "DESC"]],
    });
    return cb({
      code: 200,
      msg: "succes",
      data: articleInfo,
    });
  } catch (errMsg) {
    console.log(errMsg);
    return cb({
      code: 400,
      msg: "error",
      data: [],
      err: errMsg,
    });
  }
};

exports.findArticleListByInput = async function (typename, typeValue, cb) {
  let conditionName = "";
  let condition = { [Op.eq]: typeValue };
  switch (typename) {
    case "labels":
      conditionName = "tag_name";
      break;
    case "filing":
      conditionName = "createdAt";
      break;
    case "search":
      conditionName = "article_title";
      condition = { [Op.like]: `%${typeValue}%` };
      break;
  }

  try {
    let findLsit = void 0;
    if (typename === "filing") {
      const filingDate = moment(typeValue).format("YYYY-MM");
      filingCount = await db.query(
        `select  
            count( 1 ) AS count 
        from v_article_info 
        WHERE DATE_FORMAT( create_date, '%Y-%m' ) = '${filingDate}'`,
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      )
      filing = await db.query(
        `SELECT
          id as article_id,
          author as article_author,
          title as article_title,
          intro as article_intro,
          create_date as createdAt,
          cover as article_cover,
          pageview,
          likes
        FROM v_article_info 
        WHERE DATE_FORMAT( create_date, '%Y-%m' ) = '${filingDate}'`,
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );
      findLsit={
        count:filingCount[0].count,
        rows:filing
      }
    } else {
      findLsit = await ArticleInfo.findAndCountAll({
        where: {
          [conditionName]: condition,
        },
        attributes: [
          "article_id",
          "article_author",
          "article_title",
          "article_intro",
          "createdAt",
          "article_cover",
          "pageview",
          "likes",
        ],
        order: [["createdAt", "desc"]],
      });
    }

    return cb({
      code: 200,
      msg: "success",
      data: findLsit,
    });
  } catch (e) {
    console.log(e);
    return cb({
      code: 500,
      msg: "error",
      data: [],
    });
  }
};
