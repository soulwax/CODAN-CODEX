import { Client, Message } from 'discord.js'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { CommandResponder } from './services/command-responder'

@injectable()
export class Bot {
  private client: Client
  private readonly token: string
  private commandResponder: CommandResponder
  private temperature: number = 0.5

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.CommandResponder) commandResponder: CommandResponder
  ) {
    this.client = client
    this.token = token
    this.commandResponder = commandResponder
  }
  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      if (message.author.bot) {
        console.log('Ignoring my own or other bot messages.')
        return
      }

      this.commandResponder
        .handle(message)
        .then(() => {
          console.log('A response sent!')
        })
        .catch(() => {
          console.log('There was an error with sending a response.')
        })
    })

    return this.client.login(this.token)
  }

  public setTempreture(tempreture: number): void {
    this.temperature = tempreture
  }

  public getTempreture(): number {
    return this.temperature
  }
}
