import { Review } from '../types';
import { get, post } from './RequestHandler';


class ScoresService {
    base_url: string

    constructor(base_url: string) {
        this.base_url = base_url
    }

    getEmployeeScore(token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }

        return get(this.base_url + '/scores/employee', config);
    }

    getSummary(token: string) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }

        return get(this.base_url + '/scores/summary', config);
    }
}
export default new ScoresService("https://72gdmarqte.execute-api.us-west-2.amazonaws.com")

