const client = require("../mongo/connect.js");
const dbAnime = client.db("yami-anime").collection("anime-data")
async function routes(fastify, options) {
  fastify.get("/", async function (request, reply) {
   reply.redirect("/")
});

fastify.get(`/:animeId`, async function (request, reply) {
const animeId = request.params.animeId

  return reply.redirect(`/animes/search?query=${animeId}`);
});
  
fastify.get(`/info/:animeName`, async function (request, reply) {
 const animeName = await request.params.animeName;

  if (animeName) {
  const have = await dbAnime.find({ title_url: animeName }).toArray();
  const result = have[0]
    if (have.length > 0) {
      return reply.view('/pages/info.ejs', { anime: result })
    } else {
      return reply.view('/pages/index.ejs', { animes: have })
    }
  }  else {
    return reply.send(`Merci d'indiquer:
    /info/<nom>
    
    Ou retourner à l'accueil pour rechercher ou avoir toute la liste`)}
});

}
module.exports = routes;
