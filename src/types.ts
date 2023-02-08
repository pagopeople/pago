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
    peerReviewId?: string,
    schemaId?: string,
    projectName?: string,
    projectDescription?: string,
    companyGoal?: string,
    projectSize?: ProjectSize,
    hoursSpent?: number,
    expectedHoursSpent?: number,
    hadDeadline?: boolean,
    deadlineDate?: number,
    onSchedule?: boolean,
    offScheduleReason?: string,
    outsideEmployeeControl?: boolean,
    matchProjectNeedScore?: number,
    clarityScore?: number,
    errorsScore?: number,
    managerExcessiveScore?: number,
    managerInvolvementScore?: number,
    selfInvolvementScore?: number,
    selfInvolvementNeedScore?: number,
    exceptionalJob?: boolean,
    badJob?: boolean,
    managerInvolvmentOpinionScore?: number,
    withCoworkers?: boolean,
    withCoworkersScore?: number,
    employeeSubstituteScore?: number,
    clearExpectationsScore?: number,
    helpfulScore?: number,
    coworkerId?: string,
    coworkerPerformanceScore?: number,
    skillsNeeded?: string,
    skillProficiencyScore?: number,
    improvementAreas?: string,
    submittedBy?: string,
    reviewing?: string,
    createdAt?: number,
    submittedAt?: number,
    originalReview?: string,
}

export enum ProjectSize {
    EXISTENTIAL,
    LARGE,
    MEDIUM,
    SMALL,
};

export interface ProjectSizeSummary {
    averageScore: number,
    employeeScoreImpact: number,
    recentReviews: Array<{
        reviewId: string,
        employeeScoreImpact: number,
        score: number,
    }>
};
