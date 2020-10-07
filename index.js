const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('dotenv').config()

const deepai = require('deepai')

deepai.setApiKey(process.env.AI_API_KEY)


client.on('ready', () => {

  console.log("Up")

  client.channels.fetch(process.env.GENERAL_CHANNEL_ID)
    .then((channel) => {
      channel.send("Am watching you...")
    })

})


client.on('message', (msg) => {

  if(msg.author.bot) return

  if(msg.attachments.size > 0){
    msg.attachments.forEach((image) => {
      const imageUrl = image.url

      filterImage(imageUrl, msg)

    })
  }

})


function filterImage(url, msg){
  
    deepai.callStandardApi('nsfw-detector', {
      image: url
    })
    .then((result) => {
      let score = result.output.nsfw_score
      let nsfwScore = score.toFixed(2)

      if(nsfwScore > 0.45){
        msg.delete()
      }

    })
    .catch((err) => console.log(err))

}


client.login(process.env.BOT_TOKEN)
