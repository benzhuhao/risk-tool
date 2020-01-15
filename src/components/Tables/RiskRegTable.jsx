import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';

const useStyles = makeStyles({
    table: {
        minWidth: 200,
        border: 1,
        '& td': {
            border: 1,
            borderColor: 'black',
            background: 'rgb(255, 255, 204)',
        },
        '& th': {
            border: 1,
            borderColor: 'black',
        },
    },
});

export default function RiskRegTable() {

    const [userData, setUserData] = useState([
        { key: "User Name", value: "John Doe" },
        { key: "User ID", value: "12345" },
        { key: "Business Unit Name", value: "DMS Bank & Trust (BAT)" },
        { key: "Business Unit Type", value: "Business Line" },
    ]);

    return (
        <table className="riskRegisterTable">
            <thead>
                <tr><th colSpan="2" style={{ "textAlign": "center" }}>Risk Register</th></tr>
            </thead>
            <tbody>
                {userData.map((row, index) => (
                    <tr key={index}>
                        <th className="riskRegisterTable">{row.key}</th>
                        <td className="riskRegisterTableTD">{row.value}</td>
                    </tr>
                ))}
            </tbody>
        </table >
    );


    // < TableContainer >
    // <Table className={classes.table} size="small">
    //     <TableBody>
    //         userData.map(row => {})
    //             <TableRow>
    //             <TableCell>
    //                 User Name
    //                 </TableCell>
    //             <TableCell>
    //                 sdl;fkj
    //                 </TableCell>
    //         </TableRow>
    //         <TableRow>
    //             <TableCell>
    //                 dfgdf
    //                 </TableCell>
    //             <TableCell>
    //                 sdl;fkj
    //                 </TableCell>
    //         </TableRow>
    //         <TableRow>
    //             <TableCell>
    //                 Business Unit Name
    //                 </TableCell>
    //             <TableCell>
    //                 sdl;fkj
    //                 </TableCell>
    //         </TableRow>
    //         <TableRow>
    //             <TableCell>
    //                 sdfs
    //                 </TableCell>
    //             <TableCell>
    //                 sdl;fkj
    //                 </TableCell>
    //         </TableRow>
    //     </TableBody>
    // </Table>
    // </TableContainer >

    // <MaterialTable
    //         title="Risk Register"
    //         columns={[
    //             { title: "Key", field: "key" },
    //             { title: "Value", field: "value", render: rowData => <div style={{ backgroundColor: "yellow", padding: 0 }}>rowData.value</div> }
    //         ]}
    //         data={[
    //             { key: "User Name", value: "John Doe" },
    //             { key: "User ID", value: "12345" },
    //             { key: "Business Unit Name", value: "DMS Bank & Trust (BAT)" },
    //             { key: "Business Unit Type", value: "Business Line" },
    //         ]}
    //         components={{


    //         }}
    //         style={{
    //             padding: 0,
    //             backgroundColor: 'red',

    //         }}
    //         options={{
    //             selection: false,
    //             search: false,
    //             paging: false,
    //             header: false,
    //             padding: "dense",
    //         }}
    //     />

    // */
}
