import React, { ReactNode, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { AppliedAdjustment, BudgetData, MeritIncreaseSetting } from '../../types';
import { percentageAdjustment } from './CompAdjustmentCalculators';



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: {[key in Key]: number | string },
    b: {[key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeaderCell {
    id: string;
    label: string;
    numeric?: boolean;
    disablePadding?: boolean;
}

const defaultHeaderCells: readonly HeaderCell[] = [
    {
        id: 'firstName',
        label: 'First Name',
    }, 
    {
        id: 'lastName',
        label: 'Last Name',
    },
    {
        id: 'managerName',
        label: 'Manager'
    },
    {
        id: 'score',
        label: 'Score',
        numeric: true,
    },
    {
        id: 'salary',
        label: 'Salary',
        numeric: true,
    }
];

interface CompPlanningTableHeadProps {
    appliedAdjustments: AppliedAdjustment[];
};

function CompPlanningTableHead(props: CompPlanningTableHeadProps) {
    // const { headers } = props;
    const { appliedAdjustments } = props;
    const headerCells = [...defaultHeaderCells];
    appliedAdjustments.forEach(aa => {
        headerCells.push({
            id: `${aa.description}-%`,
            label: `${aa.description} (%)`,
            numeric: true,
        });
        headerCells.push({
            id: `${aa.description}-$`,
            label: `${aa.description} ($)`,
            numeric: true,
        });
    });
    if (appliedAdjustments.length > 0) {
        headerCells.push({
            id: 'newSalary',
            label: 'New Salary',
            numeric: true,
        });
    }

    return(
        <TableHead>
            <TableRow>
                {headerCells.map(headerCell => (
                    <TableCell
                        id={headerCell.id}
                        // align={headerCell.numeric ? 'right': 'left'}
                        padding={headerCell.disablePadding ? 'none': 'normal'}
                    >
                        <TableSortLabel>
                            {headerCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

interface CompPlanningTableProps {
    appliedAdjustments: AppliedAdjustment[],
    data: BudgetData[],
}


export default function CompPlanningTable(props: CompPlanningTableProps) {
    const { appliedAdjustments, data } = props; 
    const getUserCellsForAdjustments = (email: string) => {
        const cells: ReactNode[] = [];
        appliedAdjustments.forEach(aa => {
            const adj = aa.adjustmentsByEmail[email];
            cells.push(<TableCell>{adj ? adj.percentage : 0}</TableCell>)
            cells.push(<TableCell>{adj ? adj.dollarAmt : 0}</TableCell>)
        });
        return cells;
    };

    const getNewSalaryForUser = (email: string, curSalary: number) => {
        let newSalary = curSalary;
        appliedAdjustments.forEach(aa => {
            newSalary += aa.adjustmentsByEmail[email] ? aa.adjustmentsByEmail[email].dollarAmt : 0;
        });
        return newSalary;
    }

    return(
        <TableContainer>
            <Table size={'medium'}>
                <CompPlanningTableHead appliedAdjustments={appliedAdjustments}/>
                <TableBody>
                    {data.map(bd => {
                        return (
                            <TableRow
                                key={bd.email}
                            >
                                <TableCell>{bd.firstName}</TableCell>
                                <TableCell>{bd.lastName}</TableCell>
                                <TableCell>{bd.managerName}</TableCell>
                                <TableCell>{bd.score}</TableCell>
                                <TableCell>{bd.salary}</TableCell>
                                {getUserCellsForAdjustments(bd.email)}
                                {appliedAdjustments.length > 0 && <TableCell>{getNewSalaryForUser(bd.email, bd.salary)}</TableCell>}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}