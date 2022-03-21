module.exports = {
  apps: [
    {
      name: 'citycheck',
      script: 'npm',
      args: 'start -p 3000',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
