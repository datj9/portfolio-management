const path = require('path');

module.exports = {
  apps: [
    {
      name: 'portfolio-backend',
      script: path.resolve(__dirname, '../node_modules/@strapi/strapi/bin/strapi.js'),
      args: 'start',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 1337,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};

