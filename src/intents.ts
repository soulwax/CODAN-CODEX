require('dotenv').config() // Recommended way of loading dotenv
import { DiscordIntents } from './types'

export const DiscordIntentBitField: DiscordIntents = {
  GUILDS: 1 << 0, // 1 default
  GUILD_MEMBERS: 1 << 1, // 2
  GUILD_BANS: 1 << 2, // 4
  GUILD_EMOJIS: 1 << 3, // 8
  GUILD_INTEGRATIONS: 1 << 4, // 16
  GUILD_WEBHOOKS: 1 << 5, // 32
  GUILD_INVITES: 1 << 6, // 64
  GUILD_VOICE_STATES: 1 << 7, // 128
  GUILD_PRESENCES: 1 << 8, // 256
  GUILD_MESSAGES: 1 << 9, // 512
  GUILD_MESSAGE_REACTIONS: 1 << 10, // 1024
  GUILD_MESSAGE_TYPING: 1 << 11, // 2048
  DIRECT_MESSAGES: 1 << 12, // 4096
  DIRECT_MESSAGE_REACTIONS: 1 << 13, // 8192
  DIRECT_MESSAGE_TYPING: 1 << 14, // 16384
  MESSAGE_CONTENT: 1 << 15, // 32768
  GUILD_SCHEDULED_EVENTS: 1 << 16, // 65536
  AUTO_MODERATION_CONFIGURATION: 1 << 20, // 1048576
  AUTO_MODERATION_EXECUTION: 1 << 21 // 2097152
}

export const calculateBulkIntents = (all: boolean, boundary: number) => {
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
  
export const calculateSpecificIntents = (intents: string[]) => {
    let calculatedIntents = 1
    intents.forEach((intent) => {
      let intentValue: number = DiscordIntentBitField[intent]?.valueOf()
      calculatedIntents |= intentValue
    })
    console.log(`intents calculated: ${calculatedIntents}`)
    return calculatedIntents - 1
  }