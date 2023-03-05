import { AppliedAdjustment, BudgetData, CompAdjustment, MeritIncreaseSetting } from "../../types"

export const percentageAdjustment: (percentage: number, budgetData: BudgetData[]) => AppliedAdjustment = (percentage: number, budgetData: BudgetData[]) => {
    const adjustmentsByEmail = budgetData.reduce<{[key: string]: CompAdjustment}>((resp, bd) => {
        const adjustment = {
            percentage,
            dollarAmt: percentage / 100 * bd.salary,
        };
        resp[bd.email] = adjustment;
        return resp;
    }, {})
    return ({
        description: 'Market increase',
        adjustmentsByEmail,
    } as AppliedAdjustment);
};


export const meritAdjustment: (meritIncreaseSettings: MeritIncreaseSetting[], budgetData: BudgetData[]) => AppliedAdjustment = (meritIncreaseSettings, budgetData) => {
    const getPercentageIncrease: (score: number) => number = (score) => {
        const mis = meritIncreaseSettings.find(m => m.scoreStart <= score && score <= m.scoreEnd );
        return mis ? mis.percentageIncrease : 0;
    };

    const adjustmentsByEmail = budgetData.reduce<{[key: string]: CompAdjustment}>((resp, bd) => {
        const percentage = getPercentageIncrease(bd.score);
        const adjustment = {
            percentage,
            dollarAmt: percentage / 100 * bd.salary,
        };
        resp[bd.email] = adjustment;
        return resp;
    }, {})
    return ({
        description: 'Merit increase',
        adjustmentsByEmail,
    } as AppliedAdjustment);
}