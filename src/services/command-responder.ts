import { Message } from 'discord.js'
import { CommandListener } from './command-listener'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'

@injectable()
export class CommandResponder {
  private commandListener: CommandListener

  constructor(@inject(TYPES.CommandListener) commandListener: CommandListener) {
    this.commandListener = commandListener
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

    return Promise.reject()
  }
}
