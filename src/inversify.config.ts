import "reflect-metadata";
require('dotenv').config(); // Recommended way of loading dotenv
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";

const INTENTS = process.env.DISCORD_INTENTS ? process.env.DISCORD_INTENTS.split(',') : []

let container = new Container();

type DiscordIntents = {
    [key: string]: number
}

let discordIntentBitField : (DiscordIntents) = {
    GUILDS: 1 << 0,                         // 1 default
    GUILD_MEMBERS: 1 << 1,                  // 2
    GUILD_BANS: 1 << 2,                     // 4
    GUILD_EMOJIS: 1 << 3,                   // 8
    GUILD_INTEGRATIONS: 1 << 4,             // 16
    GUILD_WEBHOOKS: 1 << 5,                 // 32
    GUILD_INVITES: 1 << 6,                  // 64
    GUILD_VOICE_STATES: 1 << 7,             // 128
    GUILD_PRESENCES: 1 << 8,                // 256
    GUILD_MESSAGES: 1 << 9,                 // 512
    GUILD_MESSAGE_REACTIONS: 1 << 10,       // 1024
    GUILD_MESSAGE_TYPING: 1 << 11,          // 2048
    DIRECT_MESSAGES: 1 << 12,               // 4096
    DIRECT_MESSAGE_REACTIONS: 1 << 13,      // 8192
    DIRECT_MESSAGE_TYPING: 1 << 14,         // 16384
    MESSAGE_CONTENT: 1 << 15,               // 32768
    GUILD_SCHEDULED_EVENTS: 1 << 16,        // 65536
    AUTO_MODERATION_CONFIGURATION: 1 << 20, // 1048576
    AUTO_MODERATION_EXECUTION: 1 << 21,     // 2097152
}

let calculateBulkIntents = (all: boolean, boundary: number) => {
    let intents = 1
    let boundaryIntents : number = boundary ? boundary : 0
    if (all) { // override boundary
        boundaryIntents = 19
    }
    // or all intents
    for (let i = 0; i < boundaryIntents; i++) {
        intents |= discordIntentBitField[Object.keys(discordIntentBitField)[i]]
    }
    console.log(`intents calculated: ${intents}`)
    return intents - 1
}

let calculateSpecificIntents = (intents: string[]) => {
    let calculatedIntents = 1
    intents.forEach(intent => {
        let intentValue : number = discordIntentBitField[intent]?.valueOf()
        calculatedIntents |= intentValue
    })
    console.log(`intents calculated: ${calculatedIntents}`)
    return calculatedIntents - 1
}

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();

if (INTENTS[0] === 'all') {
    container.bind<Client>(TYPES.Client).toConstantValue(new Client({ intents: calculateBulkIntents(true, 0) }));
} else if (INTENTS.length > 1) {
    container.bind<Client>(TYPES.Client).toConstantValue(new Client({ intents: calculateSpecificIntents(INTENTS) }));
} else if (typeof INTENTS[0] === 'number' && INTENTS[0] > 0) {
    container.bind<Client>(TYPES.Client).toConstantValue(new Client({ intents: calculateBulkIntents(false, parseInt(INTENTS[0])) }));
} else {
    console.warn('No intents specified, defaulting to GUILDS only')
    container.bind<Client>(TYPES.Client).toConstantValue(new Client({ intents: calculateBulkIntents(false, 0) }));
}

container.bind<string>(TYPES.Token).toConstantValue(process.env.DISCORD_BOT_TOKEN ?? '');

export default container;