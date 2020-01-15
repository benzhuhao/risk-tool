import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    makeStyles
} from '@material-ui/core'
import RiskRegTable from '../components/Tables/RiskRegTable';
import RiskMainTable from '../components/Tables/RiskMainTable';

const useStyles = makeStyles({
    table: {
        minWidth: 4000,
    },
});
export default function RiskMatrix() {
    const classes = useStyles();
    return (
        <Table className={classes.table}>
            <TableBody>
                <TableRow>
                    <TableCell><RiskRegTable /></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan='2'><RiskMainTable /></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
