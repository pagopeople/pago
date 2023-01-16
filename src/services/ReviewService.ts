import { Review } from '../types';
import { get, post } from './RequestHandler';


class ReviewService {
    base_url: string

    constructor(base_url: string) {
        this.base_url = base_url
    }

    getReviews(token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }

        return get(this.base_url + '/reviews', config);
    }

    getReview(id: string, token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        return get(this.base_url + `/review/${id}`, config);
        
    }

    submitReview(review: Review, token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        return post(this.base_url + '/review', review, config);

    }

    createPeerReview(clientId: string, code: string, redirectUri: string) {
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
export default new ReviewService("https://72gdmarqte.execute-api.us-west-2.amazonaws.com")

