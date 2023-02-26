import { Review } from '../types';
import { $Service } from './Service';


export default class ReviewService extends $Service {
    getReviews() {
        return this.client.get('/reviews');
    }

    getReview(id: string) {
        return this.client.get(`/review/${id}`); 
    }

    submitReview(review: Review) {
        return this.client.post('/review', review);
    }

    getPeerReview(id: string) {
        return this.client.get(`/review/${id}/peer`); 
    }

    submitPeerReview(review: Review) {
        return this.client.post(`/review/${review.originalReview}/peer`, review);
    }
}

