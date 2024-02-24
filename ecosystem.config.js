module.exports = {
  apps: [
    {
      name: 'backend',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'dist/main.js',
      env_production: {
        ENVIRONMENT: 'production',
      },
      env_development: {
        ENVIRONMENT: 'development',
      },
    },
  ],
};
