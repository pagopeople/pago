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

    getPeerReview(id: string, token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        return get(this.base_url + `/review/${id}/peer`, config); 
    }

    submitPeerReview(review: Review, token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };

        return post(this.base_url + `/review/${review.originalReview}/peer`, review, config);
    }
}
export default new ReviewService("https://72gdmarqte.execute-api.us-west-2.amazonaws.com")

