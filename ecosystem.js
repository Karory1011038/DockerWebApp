module.exports = {
  apps: [
    {
      name: "client",
      script: "./client/node_modules/@vue/cli-service/bin/vue-cli-service.js",
      args: "dev"
    },
    {
      name: "server",
      script: "./server.js",
      args: ""
    },
  ]
};