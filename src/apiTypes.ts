import { Role } from "./types";

export interface ApiUser {
    email: string,
    created: string,
    enabled: boolean,
    modified: string,
    user_name: string,
    user_role: Role,
    first_name: string,
    last_name: string,
}

export interface InviteUserRequest {
    email?: string,
    role?: Role,
    firstName?: string,
    lastName?: string,
    userName?: string,
    tenantId?: string,
}

export interface PresignedUrl {
    fields: {
        "AWSAccessKeyId": string,
        "key": string,
        "policy": string,
        "signature": string,
        "x-amz-security-token": string
    },
    url: string,
}