const client = require("../mongo/connect.js");
const dbAnime = client.db("yami-anime").collection("anime-data")
async function routes(fastify, options) {
  fastify.get("/", async function (request, reply) {
   const have = await dbAnime.find().toArray()
  
  return reply.view("/pages/index.ejs", {animes: have });
});

fastify.get("/search", async function (request, reply) {
const search = await request.query.query;

  if (search) {
    const have = await dbAnime.find({ keywords: search }).toArray()
    
    if (have.length > 0) {
      return reply.view('/pages/search.ejs', { results: have })
    } else {
      return reply.view('/pages/search.ejs', { results: have })
    }
  }  else {
    return reply.send(`?query=<nom d'anime> serait mieux appréciable.`)}
});
  
fastify.get("/genre/:animeType", async function (request, reply) {
 const animeType = await request.params.animeType;

  if (animeType) {
  const have = await dbAnime.find({ genre: animeType}).toArray();
  
    if (have.length > 0) {
      return reply.view('/pages/list.ejs', { animes: have })
    } else {
      return reply.view('/pages/list.ejs', { animes: have })
    }
  }  else {
    return reply.send(`Merci d'indiquer:
    /info/<nom>
    
    Ou retourner à l'accueil pour rechercher ou avoir toute la liste`)}
});
}
module.exports = routes;
