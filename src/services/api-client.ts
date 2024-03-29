import {inject, injectable} from 'inversify'
import {TYPES} from '../types'

import {got} from 'got'


@injectable()
export class ApiClient {

    private readonly baseURL: string
    private readonly headers: Record<string, string>

    constructor(@inject(TYPES.BaseURL) baseURL: string, @inject(TYPES.Headers) headers: Record<string, string>) {
        this.baseURL = baseURL
        this.headers = headers
    }

    public async get(
        endpoint: string,
        queryParams?: Record<string, any>
    ): Promise<any> {
        try {
            const response = await got.get(`${this.baseURL}${endpoint}`, {
                headers: this.headers,
                searchParams: queryParams
            })
            return response.body
        } catch (error) {
            // Handle errors here
        }
    }

    public async post(endpoint: string, body?: any): Promise<any> {
        try {
            const response = await got.post(`${this.baseURL}${endpoint}`, {
                headers: this.headers,
                json: body
            })
            return response.body
        } catch (error) {
            // Handle errors here
            console.error(error)
        }
    }

    // Other HTTP methods (e.g. put, delete, etc.) can be implemented similarly
}
