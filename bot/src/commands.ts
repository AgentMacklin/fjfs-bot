import * as Discord from "discord.js"
import { getInsult, getRandomDadJoke } from "./api"
import config from "./config"

const whoIsImpostor = async (message: Discord.Message) => {
  const members = await message.guild.members.fetch()

  // Remove bots from pool of members, so the bot always accuses a person
  const nonBots = members.filter(member => !member.user.bot)
  const impostor = nonBots.random().user
  message.channel.send(`${impostor.username} is the impostor!`)
}

const handleQuestion = (message: Discord.Message) => {
  const question = message.content
    .slice(config.prefixes.question.length)
    .split(" ")
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
  const action = message.content
    .slice(config.prefixes.question.length)
    .split(" ")
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
