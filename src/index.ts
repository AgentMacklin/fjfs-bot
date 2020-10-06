import * as Discord from "discord.js"
import config from "./config.js"
import command from "./commands"

const bot = new Discord.Client()

bot.once("ready", () => {
  console.log(`${bot.user.username} is up and running`)
})

bot.on("message", message => {
  if (message.author.bot) return
  if (command(message)) return
})

bot.login(config.token)
