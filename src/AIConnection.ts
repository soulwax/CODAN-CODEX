import got from 'got'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import { Bot } from './bot'

@injectable()
export class AICoFnnection {
    private readonly openaiKey : string
    private readonly bot : Bot
    constructor(openaiKey: string, @inject(TYPES.Bot) bot: Bot)
    {
        this.bot = bot;
        this.openaiKey = openaiKey;
    }

    public async getPrompt(maxChars: number, url: string ): Promise<object> {
        const options = {
            headers: {
                Authorization: `Bearer ${this.openaiKey}`
            },
            json: {
                document: "Hello World"
            }
        }
        const data = await got.post(url, options).json()
        return new Promise<object>((resolve, reject) => {
            if (!data) {
                reject(new Error(`Error posting to ${url}`))
            }
            else {
                resolve(data)
            }
        })
    }

}