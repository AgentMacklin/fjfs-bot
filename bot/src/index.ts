import * as Discord from "discord.js"
import config from "./config.js"
import command from "./commands"
import express from 'express'
const cors = require('cors')

const bot = new Discord.Client()
const server = express()
const port = 3000
server.use(cors())


// Bot behavior for events in discord itself
bot.once("ready", () => {
  console.log(`${bot.user.username} is up and running`)
})

bot.on("message", message => {
  if (message.author.bot) return
  if (command(message)) return
})

bot.login(config.token)


server.get("/", (req, res) => {
  const msg = {data: "Hello, world!"}
  res.send(msg)
})

server.listen(port, () => {
  console.log(`Bot client server running at http://${process.env.HOSTNAME}:${port}`)
})
