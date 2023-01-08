import { get } from './RequestHandler';


class ConfigService {
    base_url: string

    constructor(base_url: string) {
        this.base_url = base_url
    }

    fetchConfig() {
        return get(this.base_url + "/config");
    }


}
export default new ConfigService("https://72gdmarqte.execute-api.us-west-2.amazonaws.com")

