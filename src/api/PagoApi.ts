import { AxiosRequestConfig } from "axios";
import ConfigService from "./ConfigService";
import { RequestHandler } from "./RequestHandler";
import ReviewService from "./ReviewService";
import ScoresService from "./ScoresService";
import SessionService from "./SessionService";

export class PagoApi {
    configService: ConfigService;
    reviewService: ReviewService;
    sessionService: SessionService;
    scoresService: ScoresService;

    // Can't use RootState type due to circular reference.
    constructor(state: any, baseURL: string) {
        const defaultConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${state.sessionState.user?.idToken}`,
                'Content-Type': 'application/json',
            },
            baseURL,
        }

        const requestHandler = new RequestHandler(baseURL, defaultConfig);
        this.configService = new ConfigService(requestHandler);
        this.reviewService = new ReviewService(requestHandler);
        this.sessionService = new SessionService(requestHandler);
        this.scoresService = new ScoresService(requestHandler);
    }
}

// {
//     'version': '1', 
//     'triggerSource': 'TokenGeneration_HostedAuth', 
//     'region': 'us-west-2', 
//     'userPoolId': 'us-west-2_fL1j2xXwT', 
//     'userName': 'GoogleWorkspace_monte@pagopeople.com', 
//     'callerContext': {
//         'awsSdkVersion': 'aws-sdk-unknown-unknown', 
//         'clientId': '7j9ia5g0m389dgs9j2j6nnlqqd'
//     }, 
//     'request': {
//         'userAttributes': {
//             'cognito:token_nbf': '1677370994672', 
//             'custom:tenantId': '7a741ce9-3fd6-4cc4-96d3-92a92255a44c', 
//             'sub': '765921c3-fd7d-4274-8d51-c356a2ff6025', 
//             'cognito:user_status': 'EXTERNAL_PROVIDER', 
//             'identities': '[{"userId":"monte@pagopeople.com","providerName":"GoogleWorkspace","providerType":"SAML","issuer":"https://accounts.google.com/o/saml2?idpid=C03q0zfrt","primary":true,"dateCreated":1677271809693}]', 
//             'email_verified': 'false', 
//             'custom:userRole': 'SystemAdmin', 
//             'given_name': 'Dymonte', 
//             'family_name': 'Misa', 
//             'email': 'monte@pagopeople.com'
//         }, 
//         'groupConfiguration': {
//             'groupsToOverride': ['us-west-2_fL1j2xXwT_GoogleWorkspace'], 
//             'iamRolesToOverride': [], 
//             'preferredRole': None
//         }
//     }, 
//     'response': {'claimsOverrideDetails': None}}
