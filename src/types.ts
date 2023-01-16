export const TYPES = {
  Bot: Symbol('Bot'),
  Client: Symbol('Client'),
  Token: Symbol('Token'),
  CommandResponder: Symbol('CommandResponder'),
  CommandListener: Symbol('CommandListener'),
  ApiClient: Symbol('ApiClient'),
  Headers: Symbol('Headers'),
  BaseURL: Symbol('BaseURL')
}

export type DiscordIntents = {
  [key: string]: number
}
