import { number } from "prop-types";

export enum LoadState {
    INIT,
    LOADING,
    LOADED,
    ERROR,
};

export enum AuthState {
    INIT,
    AUTHENTICATED,
    UNAUTHENTICATED,
};

export interface Config {
    userPoolId?: string,
    userPoolClientId?: string,
};

export interface User {
    name?: string,
    accessToken?: string,
    idToken?: string,
    familyName?: string,
    givenName?: string,
    username?: string,
};

export interface ExchangeCodeRequest {
    code: string,
    clientId: string,
    redirectUrl: string,
};

export interface Review {
    id?: string,
    version: number,
    projectName?: string,
    projectDescription?: string,
    companyGoal?: string,
    projectSize?: ProjectSize,
    hoursSpent?: number,
    hadDeadline?: boolean,
    deadlineDate?: number,
    onSchedule?: boolean,
    onScheduleReason?: string,
    matchScore?: number,
    clarityScore?: number,
    errorsScore?: number,
    managerInvolvementScore?: number,
    desiredManagerInvolvementScore?: number,
    managerInvolvmentOpinionScore?: number,
    withCoworkers?: boolean,
    coworkerId?: string,
    coworkerPerformanceScore?: number,
    skillsNeeded?: string,
    skillProficiencyScore?: number,
    improvementAreas?: string,
    submittedBy?: string,
    submittedFor?: string,
    createdAt?: number,
}

export enum ProjectSize {
    EXISTENTIAL,
    LARGE,
    MEDIUM,
    SMALL,
};


