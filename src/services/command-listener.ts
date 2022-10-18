import { injectable } from 'inversify'

@injectable()
export class CommandListener {
  private regexp = ['!who', '!roll']

  public isWhoCommand(message: string): boolean {
    return message.search(this.regexp[0]) >= 0
  }

  public isRollCommand(message: string): boolean {
    return message.search(this.regexp[1]) >= 0
  }
}
