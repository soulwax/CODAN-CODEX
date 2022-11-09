import { injectable } from 'inversify'

@injectable()
export class CommandListener {
  private regexp = ['!who', '!roll', '!help']

  public isWhoCommand(message: string): boolean {
    return message.search(this.regexp[0]) >= 0
  }

  public isRollCommand(message: string): boolean {
    return message.search(this.regexp[1]) >= 0
  }

  public isHelpCommand(message: string): boolean {
    return message.search(this.regexp[2]) >= 0
  }
}
