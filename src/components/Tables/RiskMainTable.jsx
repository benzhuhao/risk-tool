import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { Icon, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useGlobalState, } from '../GlobalReducer/GlobalState';
import MyForm from '../Editor'
import TestForm from '../Editor/TestForm'
import moment from 'moment';

const getCellWithStyle = (data) => {
    return {
        ...data,
        cellStyle: (value, rowData) => {
            const base = {
                border: '1px solid black',
                borderSpacing: 0,
                borderCollapse: 'collapse',
                verticalAlign: 'top',
            };
            switch (value) {
                case "Material (3B)":
                case "Material (3C)":
                case "Appetite: High":
                    return {
                        ...base,
                        background: 'pink', padding: 10,
                    };
                case "Important (2B)":
                case "Significant (2C)":
                case "Significant (3A)":
                case "Appetite: Medium":
                    return {
                        ...base,
                        background: 'rgb(227, 195, 98)', padding: 10,
                    };
                case "Operational - Governance Risk":
                case "Operational - Key Person/ Resourcing Risk":
                case "Operational - Supervision of Third Parties Risk":
                case "Operational - Business Continuity Planning Risk":
                case "Operational - Data Risk":
                case "Operational - IT / Cybersecurity Risk":
                case "Operational - Geopolitical Risk":
                case "Operational"://====above Operational Risk=======================
                case "Regulatory - Compliance Risk":
                case "Regulatory - Regulatory Change Risk":
                case "Regulatory - Anti Money Laundering & CTF Risk":
                case "Regulatory - Legal Risk":
                case "Regulatory":
                    return {
                        ...base,
                        background: 'rgb(79,97,130)', padding: 10,
                    };
                case "Financial - Finance Risk":
                case "Financial - Regulatory Capital Risk":
                case "Financial - Insurance Risk":
                case "Financial - New Business / Product Risk":
                case "Financial - Market Risk":
                case "Financial - Currency Risk":
                case "Financial - Strategic Risk":
                case "Financial - Reputational Risk":
                case "Financial"://====above Financial Risk=======================
                case "Core Function - AML COE Team Risk":
                case "Core Function - Compliance Team Risk":
                case "Core Function - IT Team Risk":
                case "Core Function - HR Team Risk":
                case "Core Function - Finance Team Risk":
                case "Core Function - Business Development Team Risk":
                case "Core Function - Audit Team Risk":
                case "Core Function":
                    return {
                        ...base,
                        background: 'rgb(119,155,144)', padding: 10,
                    };
                default:
                    return {
                        ...base,
                    };
            }
        },

    };
}

const isError = (rowData) => {
    if (rowData.inherentRiskRating === 'Significant (3A)' || rowData.residualRiskRating === 'Significant (3A)') {
        return true;
    } else if (rowData.inherentRiskRating === 'Material (3B)' || rowData.residualRiskRating === 'Material (3B)') {
        return true;
    } else if (rowData.inherentRiskRating === 'Material (3C)' || rowData.residualRiskRating === 'Material (3C)') {
        return true;
    } else if (rowData.inherentRiskRating === 'Important (2B)' || rowData.residualRiskRating === 'Important (2B)') {
        return true;
    } else if (rowData.inherentRiskRating === 'Significant (2C)' || rowData.residualRiskRating === 'Significant (2C)') {
        return true;
    }

    return false;
}

const headers = [
    { title: "Risk Pillar", field: "riskPillar", },
    { title: "Risk Category", field: "riskCategory", },
    {
        title: "Sub-Risk ID", field: "subRiskID",
        render: rowData => isError(rowData) ? (<>{rowData.subRiskID}<Icon style={{ color: 'red', fontSize: 50 }}>warning_outlined</Icon></>) : (<>{rowData.subRiskID}</>)
    },
    { title: "Sub Risk Name", field: "subRiskName", },
    { title: "Sub Risk Description", field: "subRiskDesc", },
    { title: "Risk Owner", field: "riskOwner", },
    { title: "Date Added", field: "dateAdded", },
    { title: "Regulated BU", field: "regulatedBU", },
    { title: "Regulatory Framework", field: "regulatoryFramework", },
    { title: "PRISM Categories", field: "PRISM_Categories", },
    { title: "CRD Categories", field: "CRD_Categories", },
    { title: "Basel Categories", field: "baselCategories", },
    { title: "ICAAP Categories", field: "ICAAP_Categories", },
    { title: "Inherent Risk Impact", field: "inherentRiskImpact", },
    { title: "Inherent Risk Likelihood", field: "inherentRiskLikelihood", },
    { title: "Inherent Risk Rating", field: "inherentRiskRating", },
    { title: "Risk Mitigant Description", field: "riskMitigantDesc", },
    { title: "Control Reference Number(s)", field: "controlRefNums", },
    { title: "Residual Risk Impact", field: "residualRiskImpact", },
    { title: "Residual Risk Likelihood", field: "residualRiskLikelihood", },
    { title: "Residual Risk Rating", field: "residualRiskRating", },
    { title: "Group Risk Appetite", field: "groupRiskAppetite", },
    { title: "Is the Residual Risk Rating breaching Risk Appetite", field: "isBreachingRiskAppetite", }];

const initdata = {
    business_unit_name: "",
    business_unit_type: "",
    subRiskID: "",
    riskPillar: "",
    riskCategory: "",
    riskCategoryDesc: "",
    subRiskName: "",
    subRiskDesc: "",
    riskOwner: "",
    dateAdded: "",
    regulatedBU: "",
    regulatoryFramework: "",
    PRISM_Categories: [],
    CRD_Categories: [],
    baselCategories: [],
    ICAAP_Categories: [],
    inherentRiskImpact: "",
    inherentRiskLikelihood: "",
    inherentRiskRating: "",
    residualRiskImpact: "",
    residualRiskLikelihood: "",
    residualRiskRating: "",
    groupRiskAppetite: "",
    isBreachingRiskAppetite: "",
};
const getTimeNow = () => {
    return moment().format();
}

export default function RiskMainTable(props) {

    const changeGlobalState = useGlobalState();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [row, setRow] = useState(changeGlobalState.row);
    useEffect(() => {
        if (changeGlobalState.riskRegFormOpen) {
            // const { current: descriptionElement } = descriptionElementRef;
            // if (descriptionElement !== null) {
            //     descriptionElement.focus();
            // }
            setOpen(changeGlobalState.riskRegFormOpen);
        }
        if (changeGlobalState.table) {

        }
    }, [changeGlobalState.riskRegFormOpen, changeGlobalState.table]);

    const handleClickOpen = () => {
        changeGlobalState.setRiskRegFormOpen(true);
        setOpen(true);
    };
    const handleClose = (type) => {
        switch (type) {
            case 'save':
                if (changeGlobalState.row.residualRiskRating !== "") {
                    changeGlobalState.change_dateAdded(getTimeNow());
                    changeGlobalState.addRowInTable(changeGlobalState.row);
                }
                changeGlobalState.setRiskRegFormOpen(false);
                setOpen(false);
                setEdit(false);
                break;
            case 'cancel':
                if(edit === 'true') {
                    changeGlobalState.addRowInTable(changeGlobalState.row);
                }
                changeGlobalState.setRiskRegFormOpen(false);
                setEdit(false);
                setOpen(false);
                break;
            default:
                break;
        }
    };
    // const handleClose = () => {
    //     changeGlobalState.setRiskRegFormOpen(false);
    //     setOpen(false);
    // };

    const handleClickEdit = () => {
        changeGlobalState.setRiskRegFormOpen(true);
        setOpen(true);
    }

    const styledHeaders = headers.map(header => {
        return getCellWithStyle(header);
    })

    return (
        <>
            <MaterialTable
                title="Risk Matrix"
                columns={styledHeaders}
                data={changeGlobalState.table}
                actions={[
                    {
                        icon: 'add_circle_outline_rounded',
                        tooltip: 'Add Risk data Item',
                        isFreeAction: true,
                        iconProps: { style: ({ color: '#8646b4', fontSize: 27 }) },
                        onClick: (event) => {
                            changeGlobalState.setRow(initdata);
                            handleClickOpen()
                        }
                    },
                    {
                        icon: 'edit_outline',
                        tooltip: 'Edit Risk data Item',
                        iconProps: { style: ({ color: '#8646b4', fontSize: 30 }) },
                        onClick: (event, row) => {
                            // setRow(row);
                            setEdit(true);
                            //changeGlobalState.setRow(row);
                            changeGlobalState.deleteRowInTable(row);
                            handleClickEdit()
                        }
                    }
                ]}

                options={{
                    headerStyle: {
                        border: '1px solid black',
                        borderSpacing: 0,
                        borderCollapse: 'collapse',
                        fontWeight: 'bold',
                        color: 'white',
                        background: '#8646b4'
                    },
                    actionsCellStyle: {
                        border: '1px solid black',
                        borderSpacing: 0,
                        borderCollapse: 'collapse',
                        padding: '0px 30px'
                    },
                    search: true,
                    sorting: true,
                    filtering: false,
                    searchFieldAlignment: "left",
                    toolbarButtonAlignment: "left",
                    padding: "dense",
                    paging: false,
                    actionsColumnIndex: 0,
                    minBodyHeight: 400,
                }}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth='md'
                fullWidth={true}
            >
                <DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>Risk Register Form</DialogTitle>
                <DialogContent dividers={true}>
                    <TestForm />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        style={{ background: '#8646b4', color: 'white' }}
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={() => handleClose('save')}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        style={{ background: '#8646b4', color: 'white' }}
                        size="small"
                        startIcon={<Icon>cancel</Icon>}
                        onClick={() => handleClose('cancel')}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
} 