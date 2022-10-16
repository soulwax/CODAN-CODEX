import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES, DiscordIntents } from './types'
import { Bot } from './bot'
import { Client } from 'discord.js'
import { DiscordIntentBitField } from './intents'
const INTENTS = process.env.DISCORD_INTENTS?.split(',') || []

let container = new Container()

let calculateBulkIntents = (all: boolean, boundary: number) => {
  let intents = 1
  let boundaryIntents: number = boundary ? boundary : 0
  if (all) {
    // override boundary
    boundaryIntents = 19
  }
  // or all intents
  for (let i = 0; i < boundaryIntents; i++) {
    intents |= DiscordIntentBitField[Object.keys(DiscordIntentBitField)[i]]
  }
  console.log(`intents calculated: ${intents}`)
  return intents - 1
}

let calculateSpecificIntents = (intents: string[]) => {
  let calculatedIntents = 1
  intents.forEach((intent) => {
    let intentValue: number = DiscordIntentBitField[intent]?.valueOf()
    calculatedIntents |= intentValue
  })
  console.log(`intents calculated: ${calculatedIntents}`)
  return calculatedIntents - 1
}

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

export default container
