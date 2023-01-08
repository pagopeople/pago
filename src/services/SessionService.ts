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

        // Content-Type='application/x-www-form-urlencoded'&
        //                Authorization=Basic aSdxd892iujendek328uedj
                       
        //                grant_type=authorization_code&
        //                client_id=djc98u3jiedmi283eu928&
        //                code=AUTHORIZATION_CODE&
        //                redirect_uri=com.myclientapp://myclient/redirect

    //     fetch('https://2a67uxwzf2.execute-api.eu-west-1.amazonaws.com/dev/auth',{
    //         method: 'POST',
    //         body: JSON.stringify(authCode),
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       }).then((res)=>{return res.json()}).then(data=>{
    //         console.log('access token is:');
    //         console.log(data.result['access_token']);
    //         console.log('id token is:');
    //         console.log(data.result['id_token']);
    //         localStorage.setItem('access_token',data.result['access_token']);
    //         history.replace('/home')
    //       });
    // }
    }

    // https://pagopeople.auth.us-west-2.amazoncognito.com/login?client_id=7j9ia5g0m389dgs9j2j6nnlqqd&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://example.com


}
export default new SessionService("https://pagopeople.auth.us-west-2.amazoncognito.com/oauth2/token")

