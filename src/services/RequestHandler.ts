import axios from 'axios';


export const get = async (url: string, config: any = {}) => {
    try {
        const resp = await axios.get(url, config);
        return resp.data;
    } catch(e) {
        console.log(e);
        throw e
    }
}

export const post = async (url: string, data: any = {}, config: any = {}) => {
    try {
        const resp = await axios.post(url, data, config);
        return resp.data;
    } catch(e) {
        console.log(e);
        throw e
    }
};

