import {request, APIRequestContext} from '@playwright/test';

export class RedditApiCollection{

    private requestContext : APIRequestContext;

    constructor(requestContext: APIRequestContext){
        this.requestContext = requestContext;
    }

    async getAccessToken (userName: string, password: string): Promise<string>{
        const response = await this.requestContext.post('https://www.reddit.com/api/v1/access_token',{
            form:{
                grant_type: 'password',
                userName,
                password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from('cz4ULZv7XCOeSVSd-_4K8g:4S6S6fR_VF_kihkBatPSwb2zfiv8AA').toString('base64'),
            },
        });
        if(!response.ok())
            throw new Error(`${response.status()}`);
            const data = await response.json();
            return data.access_token;        
    }

}