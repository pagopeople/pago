import { AxiosRequestConfig } from "axios";
import { InviteUserRequest, PresignedUrl } from "../apiTypes";
import { $Service } from "./Service";


export default class UserService extends $Service {

    getUsers() {
        return this.client.get("/users", {});
    }

    inviteUser(request: InviteUserRequest) {
        return this.client.post("/users", request);
    }

    getUploadUrl() {
        const config = {}
        return this.client.get("/organization/uploadUrl", config);
    }

    uploadToS3(file: File, presignedUrl: PresignedUrl) {

        const data = {
            ...presignedUrl.fields,
            file,
        }
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            baseURL: presignedUrl.url
        }

        return this.client.post('', data, config);
    }


}

