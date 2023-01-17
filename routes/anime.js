const client = require("../mongo/connect.js");
const dbAnime = client.db("yami-anime").collection("anime-data");
async function routes(fastify, options) {
  fastify.get("/", async function (request, reply) {
   const have = await dbAnime.find().toArray();
      return reply.view('/pages/index.ejs', { animes: have })
});
  
fastify.get("/watchtest", function (request, reply) {
  reply.view("/pages/watch.html");
});
  
fastify.get("/apropos", function (request, reply) {
  reply.view("/pages/apropos.html");
});
};

module.exports = routes;
