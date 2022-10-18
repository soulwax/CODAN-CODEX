import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { Bot } from './bot'
import { Client } from 'discord.js'
import { calculateBulkIntents, calculateSpecificIntents } from './intents'
import { CommandResponder } from './services/command-responder'
import { CommandListener } from './services/command-listener'

const INTENTS = process.env.DISCORD_INTENTS?.split(',') || []

let container = new Container()

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope()

if (INTENTS[0] === 'all') {
  container
    .bind<Client>(TYPES.Client)
    .toConstantValue(new Client({ intents: calculateBulkIntents(true, 0) }))
} else if (INTENTS.length > 1) {
  container
    .bind<Client>(TYPES.Client)
    .toConstantValue(new Client({ intents: calculateSpecificIntents(INTENTS) }))
} else if (typeof INTENTS[0] === 'number' && INTENTS[0] > 0) {
  container
    .bind<Client>(TYPES.Client)
    .toConstantValue(
      new Client({ intents: calculateBulkIntents(false, parseInt(INTENTS[0])) })
    )
} else {
  console.warn('No intents specified, defaulting to GUILDS only')
  container
    .bind<Client>(TYPES.Client)
    .toConstantValue(new Client({ intents: calculateBulkIntents(false, 0) }))
}

container
  .bind<string>(TYPES.Token)
  .toConstantValue(process.env.DISCORD_BOT_TOKEN ?? '')

container
  .bind<CommandResponder>(TYPES.CommandResponder)
  .to(CommandResponder)
  .inSingletonScope()

container
  .bind<CommandListener>(TYPES.CommandListener)
  .to(CommandListener)
  .inSingletonScope()

export default container
