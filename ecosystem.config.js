/*
 * @Author: zi.yang
 * @Date: 2020-07-02 15:07:53
 * @LastEditTime: 2020-07-02 15:13:39
 * @LastEditors: 
 * @Description: In User Settings Edit
 * @FilePath: \ziYangBlog\ecosystem.config.js
 */ 
module.exports = {
  apps : [{
    name:"ziyangBlog",
    script: 'bin/www',
    watch: '.',
    env_dev: {
      NODE_ENV: "development",
    },
    env_pro: {
      NODE_ENV: "production",
    }
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
