"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bot_1 = require("./bot");
const discord_js_1 = require("discord.js");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client({ intents: 131071 }));
container.bind(types_1.TYPES.Token).toConstantValue((_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : '');
exports.default = container;
//# sourceMappingURL=inversify.config.js.map