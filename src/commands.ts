import * as Discord from "discord.js"
import config from "./config"
import { getRandomDadJoke, getInsult } from "./api"

const whoIsImpostor = async (message: Discord.Message) => {
  const members = await message.guild.members.fetch()
  let impostor: Discord.User

  // Make sure the bot doesn't say it's the impostor
  while (true) {
    impostor = members.random().user
    if (!impostor.bot) break
  }

  message.channel.send(`${impostor.username} is the impostor!`)
}

const handleQuestion = (message: Discord.Message) => {
  const question = message.content.slice(config.prefixes.question.length).split(" ")
  switch (question[0]) {
    case "impostor":
      whoIsImpostor(message)
      break

    default:
      message.channel.send("Hmm, not sure what you are asking me.")
      break
  }
}

const handleAction = async (message: Discord.Message) => {
  const action = message.content.slice(config.prefixes.question.length).split(" ")
  switch (action[0]) {
    case "joke":
      const joke = await getRandomDadJoke()
      message.channel.send(joke)
      break

    case "insult":
      const insult = await getInsult(action[1])
      message.channel.send(insult)
      break

    default:
      message.channel.send("Hmm, not sure what that action is.")
      break
  }
}

// Handle commands from users. Returns true if a message was a command,
// so the message function in main can terminate early
export default (message: Discord.Message): boolean => {
  const content = message.content
  const prefix = content.charAt(0)

  if (
    prefix !== config.prefixes.action &&
    prefix !== config.prefixes.question
  ) {
    return false
  }

  switch (prefix) {
    case config.prefixes.question:
      handleQuestion(message)
      break
    case config.prefixes.action:
      handleAction(message)
      break
  }
  return true
}
