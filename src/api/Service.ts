export class $Service {
    protected client;

    constructor(requestHandler: any) {
        this.client = requestHandler;
    }
}