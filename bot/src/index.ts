import * as Discord from "discord.js"
import config from "./config.js"
import command from "./commands"
import io from "socket.io"

const bot = new Discord.Client()
const wss = io()

// Bot behavior for events in discord itself
bot.once("ready", () => {
  console.log(`${bot.user.username} is up and running`)
})

bot.on("message", message => {
  if (message.author.bot) return
  if (command(message)) return
})

bot.login(config.token)

wss.on("connection", socket => {
  console.log("client connected")

  socket.on("get-channels", () => {
    console.log("Emitting channels")
    const channels = bot.channels.cache.toJSON()
    socket.emit("channels", JSON.stringify(channels))
  })

  socket.on("send-message", data => {
    const channel = bot.channels.cache.get(data.channel)
    if (channel.isText()) {
      channel.send(data.message)
    }
  })
})

wss.listen(3000)
