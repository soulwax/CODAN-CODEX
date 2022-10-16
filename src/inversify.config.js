"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require('dotenv').config(); // Recommended way of loading dotenv
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bot_1 = require("./bot");
const discord_js_1 = require("discord.js");
const INTENTS = process.env.DISCORD_INTENTS.split(',');
let container = new inversify_1.Container();
let discordIntentBitField = {
    GUILDS: 1 << 0,
    GUILD_MEMBERS: 1 << 1,
    GUILD_BANS: 1 << 2,
    GUILD_EMOJIS: 1 << 3,
    GUILD_INTEGRATIONS: 1 << 4,
    GUILD_WEBHOOKS: 1 << 5,
    GUILD_INVITES: 1 << 6,
    GUILD_VOICE_STATES: 1 << 7,
    GUILD_PRESENCES: 1 << 8,
    GUILD_MESSAGES: 1 << 9,
    GUILD_MESSAGE_REACTIONS: 1 << 10,
    GUILD_MESSAGE_TYPING: 1 << 11,
    DIRECT_MESSAGES: 1 << 12,
    DIRECT_MESSAGE_REACTIONS: 1 << 13,
    DIRECT_MESSAGE_TYPING: 1 << 14,
    MESSAGE_CONTENT: 1 << 15,
    GUILD_SCHEDULED_EVENTS: 1 << 16,
    AUTO_MODERATION_CONFIGURATION: 1 << 20,
    AUTO_MODERATION_EXECUTION: 1 << 21, // 2097152
};
let calculateBulkIntents = (all, boundary) => {
    let intents = 1;
    let boundaryIntents = boundary ? boundary : 0;
    if (all) { // override boundary
        boundaryIntents = 19;
    }
    // or all intents
    for (let i = 0; i < boundaryIntents; i++) {
        intents |= discordIntentBitField[Object.keys(discordIntentBitField)[i]];
    }
    console.log(`intents calculated: ${intents}`);
    return intents - 1;
};
let calculateSpecificIntents = (intents) => {
    let calculatedIntents = 1;
    intents.forEach(intent => {
        calculatedIntents |= discordIntentBitField[intent];
    });
    console.log(`intents calculated: ${calculatedIntents}`);
    return calculatedIntents - 1;
};
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
if (INTENTS[0] === 'all') {
    container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client({ intents: calculateBulkIntents(true, 0) }));
}
else if (INTENTS.length > 1) {
    container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client({ intents: calculateSpecificIntents(INTENTS) }));
}
else if (typeof INTENTS[0] === 'number' && INTENTS[0] > 0) {
    container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client({ intents: calculateBulkIntents(false, parseInt(INTENTS[0])) }));
}
else {
    console.warn('No intents specified, defaulting to GUILDS only');
    container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client({ intents: calculateBulkIntents(false, 0) }));
}
container.bind(types_1.TYPES.Token).toConstantValue((_a = process.env.DISCORD_BOT_TOKEN) !== null && _a !== void 0 ? _a : '');
exports.default = container;
//# sourceMappingURL=inversify.config.js.map