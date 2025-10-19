module.exports = {
  apps: [{
    name: 'wittywealth-backend',
    script: './backend/start-production.js',
    cwd: '/var/www/wittywealth',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/pm2/wittywealth-error.log',
    out_file: '/var/log/pm2/wittywealth-out.log',
    log_file: '/var/log/pm2/wittywealth-combined.log',
    time: true
  }]
};
