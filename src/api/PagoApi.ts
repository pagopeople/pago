import { AxiosRequestConfig } from "axios";
import ConfigService from "./ConfigService";
import { RequestHandler } from "./RequestHandler";
import ReviewService from "./ReviewService";
import ScoresService from "./ScoresService";
import SessionService from "./SessionService";
import UserService from "./UserService";
import CompensationService from "./CompensationService";

export class PagoApi {
    configService: ConfigService;
    reviewService: ReviewService;
    sessionService: SessionService;
    scoresService: ScoresService;
    userService: UserService;
    compensationService: CompensationService;

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
        this.userService = new UserService(requestHandler);
        this.compensationService = new CompensationService(requestHandler);
    }
}

