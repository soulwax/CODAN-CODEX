import got from 'got'

class AIConnection {
    private readonly openaiKey : string
    constructor(openaiKey: string) {
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