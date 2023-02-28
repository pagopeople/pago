import { AxiosRequestConfig } from "axios";
import { InviteUserRequest } from "../apiTypes";
import { $Service } from "./Service";


export default class UserService extends $Service {

    getUsers() {
        return this.client.get("/users", {});
    }

    inviteUser(request: InviteUserRequest) {
        return this.client.post("/users", request);
    }
}

