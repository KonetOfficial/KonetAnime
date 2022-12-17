const http = require('http')
let server

const serverFactory = (handler, opts) => {
 server = http.createServer((req, res) => {
    handler(req, res)
  })

  return server
};
require("dotenv").config();
require("./mongo/connect.js");
const fastify = require("fastify");
const path = require("path");
const app = fastify({serverFactory});


app.register(require("@fastify/static"), {
  root: path.join(__dirname, "assets"),
  prefix: '/assets/',
  decorateReply: false
});

app.register(require("@fastify/formbody"));

app.register(require("@fastify/view"), {
  engine: {
    ejs: require("ejs"),
  },
});
app.register(require("./routes/main.js"))
app.register(require("./routes/anime"), { prefix: "/anime"});
app.register(require("./routes/animes"), { prefix: "/animes"});


app.ready(() => {
  server.listen({ port: 8080 })
})
