const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('dotenv').config()


client.on('ready', () => {

  console.log("Up")

  client.channels.fetch(process.env.GENERAL_CHANNEL_ID)
    .then((channel) => {
      channel.send("Am watching you...")
    })



})

client.login(process.env.BOT_TOKEN)
