import { injectable } from 'inversify'

@injectable()
export class CommandListener {
  private regexp = ['!who', '!roll', '!help', '!code']

  public isWhoCommand(message: string): boolean {
    return message.search(this.regexp[0]) >= 0
  }

  public isRollCommand(message: string): boolean {
    return message.search(this.regexp[1]) >= 0
  }

  public isHelpCommand(message: string): boolean {
    return message.search(this.regexp[2]) >= 0
  }

  public isCodeCommand(message: string): boolean {
    return message.search(this.regexp[3]) >= 0
  }
}
