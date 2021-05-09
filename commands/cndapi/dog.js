const querystring = require('querystring');
const r2          = require('r2');
const Discord     = require('discord.js');

const { dogapikey } = require("../../config.json");

const DOG_API_URL   = "https://api.thedogapi.com/";
const DOG_API_KEY   = dogapikey; 

async function loadImage(sub_id) {
  var headers = {
      'X-API-KEY': DOG_API_KEY,
  }
  var query_params = {
    'has_breeds':true, // we only want images with at least one breed data object - name, temperament etc
    'mime_types':'jpg,png', // we only want static images as Discord doesn't like gifs
    'size':'small',   // get the small images as the size is prefect for Discord's 390x256 limit
    'sub_id': sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
    'limit' : 1       // only need one
  }
  // convert this object to query string 
  let queryString = querystring.stringify(query_params);

  try {
    // construct the API Get request url
    let _url = DOG_API_URL + `v1/images/search?${queryString}`;
    // make the request passing the url, and headers object which contains the API_KEY
    var response = await r2.get(_url , {headers} ).json
  } catch (e) {
      console.log(e)
  }
  return response;
}

module.exports = {
	name: 'dog',
	description: 'See some dogs',
	aliases: ['do'],
	usage: '',
	category: "Fun",
	cooldown: 4,
	async execute(message, args) {
        const randomName = await loadImage(message.author.username);

        const image = randomName[0];
        const breed = image.breeds[0];

        const embed2 = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Dog :>')
            .setDescription("Breed Name: " + breed.name)
            .addField("Temperment", breed.temperament)
            .setImage(image.url)
            .setFooter(`haha bad`);
        message.channel.send(embed2)
	},
};