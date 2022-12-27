import { Message } from 'discord.js'
import { CommandListener } from './command-listener'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { ApiClient } from './api-client'
@injectable()
export class CommandResponder {
  private commandListener: CommandListener
  private ApiClient: ApiClient

  constructor(
    @inject(TYPES.CommandListener) commandListener: CommandListener,
    @inject(TYPES.ApiClient) ApiClient: ApiClient
  ) {
    this.commandListener = commandListener
    this.ApiClient = ApiClient
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (this.commandListener.isWhoCommand(message.content)) {
      return message.reply(
        'I am bot that is made to demonstrate connection between NodeJs and Discord.'
      )
    }

    if (this.commandListener.isRollCommand(message.content)) {
      const rolled = Math.floor(Math.random() * 100) + 1
      return message.reply(`You have rolled ${rolled}`)
    }

    if (this.commandListener.isHelpCommand(message.content)) {
      return message.reply(
        `List of commands:
        !who - returns information about the bot
        !roll - returns a random number between 1 and 100
        !help - returns a list of commands
        !code - sends an API call to Codex API and returns code completion suggestions`
      )
    }

    if (this.commandListener.isCodeCommand(message.content)) {
      // handle codex api call and return message
      // TODO: implement this
      this.ApiClient.get('/api/v1/code-completion', { query: 'const a = 1' }).then((response) => {
        console.log(response)
      })
    }
    return Promise.reject()
  }
}
