import { get, post } from './RequestHandler';


class SessionService {
    base_url: string

    constructor(base_url: string) {
        this.base_url = base_url
    }

    exchangeCodeForTokens(clientId: string, code: string, redirectUri: string) {
        const data = {
            grant_type: "authorization_code",
            client_id: clientId,
            code: code,
            redirect_uri: redirectUri,
        };
        const params = new URLSearchParams();
        params.append("code", code);
        params.append("grant_type", "authorization_code");
        params.append("client_id", clientId);
        const p = params.toString() + `&redirect_uri=${redirectUri}`
        
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        return post(this.base_url + '?' + p, {}, config);
    }
}
export default new SessionService("https://pagopeople.auth.us-west-2.amazoncognito.com/oauth2/token")

