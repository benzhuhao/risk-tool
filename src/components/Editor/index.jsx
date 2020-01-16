import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGlobalState, GlobalStateContext } from '../GlobalReducer/GlobalState'
import { TYPE } from '../GlobalReducer/RiskMatrixReducer'
import { Paper, Grid, FormControl, makeStyles, InputLabel, Select, MenuItem, TextField, Chip, Input, Button, Icon, } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { business_unit_name_mapper, riskCategoryMapper, ratingMapper } from '../Mapper'
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 320,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const getBusinessUnitValue = (watchValue) => {
    const head = watchValue.split(" - ", 1);
    return business_unit_name_mapper[head];
}

const getRiskCategory = (category) => {
    const head = category.split(" - ");
    return riskCategoryMapper.find(elem => elem.Category === head[1]).description;
}

const getGroupRiskAppetite = (category) => {
    const head = category.split(" - ");
    const item = riskCategoryMapper.find(elem => elem.Category === head[1]);
    tempRisk.riskAppetiteScore = item.score;
    return item.riskAppetite;
}

const getInherentRiskRating = (temp) => {
    if (temp.inherentRiskImpact !== "" && temp.inherentRiskLikelihood !== "") {
        return ratingMapper.find(elem => elem.impact === temp.inherentRiskImpact && elem.likelihood === temp.inherentRiskLikelihood).rating
    }
    return "";
}

const getAppetiteRating = (temp) => {
    if (temp.residualRiskImpact !== "" && temp.residualRiskLikelihood !== "") {
        const item = ratingMapper.find(elem => elem.impact === temp.residualRiskImpact && elem.likelihood === temp.residualRiskLikelihood);
        tempRisk.residualRiskScore = item.score;
        return item.Appetite
    }
    return "";
}

let tempRisk = {
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
    riskAppetiteScore: 0,
    residualRiskScore: 0,
}

const getTimeNow = () => {
    return moment().format();
}

export default function MyForm() {

    const classes = useStyles();

    const { register, handleSubmit, errors, control } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {},
        validationSchema: {},
        validateCriteriaMode: "firstErrorDetected",
        submitFocusError: true,
        nativeValidation: false,
    });

    const changeGlobalState = useGlobalState();
    const onSubmit = data => console.log(data);
    tempRisk = { ...changeGlobalState.row };

    useEffect(() => {

    }, [])

    const handleChange = (type, event) => {
        changeGlobalState.change_dateAdded(getTimeNow());
        switch (type) {
            case TYPE.change_business_unit_name:
                tempRisk.business_unit_name = event.target.value;
                changeGlobalState.change_business_unit_name(event.target.value);
                console.log(event.target.name, event.target.value);
            // business unit name determined the business unit type, so no key word break;
            // eslint-disable-next-line no-fallthrough
            case TYPE.change_business_unit_type:
                tempRisk.business_unit_type = event.target.value;
                changeGlobalState.change_business_unit_type(getBusinessUnitValue(event.target.value));

            // eslint-disable-next-line no-fallthrough
            case TYPE.change_subRiskID:
                tempRisk.subRiskID = "ABL-R-1-22-33";
                changeGlobalState.change_subRiskID("ABL-R-1-22-33");
                break;

            case TYPE.change_riskPillar:
                const pillar = event.target.value;
                tempRisk.riskPillar = event.target.value;
                changeGlobalState.change_riskPillar(pillar);
                break;
            // eslint-disable-next-line no-fallthrough
            case TYPE.change_riskCategory:
                tempRisk.riskCategory = event.target.value;
                changeGlobalState.change_riskCategory(event.target.value);
                if (tempRisk.riskCategory === "" || event.target.value.split(" - ", 1)[0] !== tempRisk.riskCategory) { // if category not equal pillar
                    tempRisk.riskPillar = event.target.value.split(" - ", 1)[0];
                    changeGlobalState.change_riskPillar(event.target.value.split(" - ", 1)[0]);
                }
                tempRisk.groupRiskAppetite = getGroupRiskAppetite(event.target.value)
                changeGlobalState.change_groupRiskAppetite(getGroupRiskAppetite(event.target.value));
            // eslint-disable-next-line no-fallthrough
            case TYPE.change_riskCategoryDesc:
                tempRisk.riskCategoryDesc = getRiskCategory(event.target.value);
                changeGlobalState.change_riskCategoryDesc(getRiskCategory(event.target.value));
                break;
            case TYPE.change_subRiskName:
                tempRisk.subRiskName = event.target.value;
                changeGlobalState.change_subRiskName(event.target.value);
                break;
            case TYPE.change_subRiskDesc:
                tempRisk.subRiskDesc = event.target.value;
                changeGlobalState.change_subRiskDesc(event.target.value);
                break;
            case TYPE.change_riskOwner:
                tempRisk.riskOwner = event.target.value
                changeGlobalState.change_riskOwner(event.target.value);
                break;
            case TYPE.change_regulatedBU:
            case TYPE.change_regulatoryFramework:
            case TYPE.change_PRISM_Categories:
                tempRisk.PRISM_Categories = event.target.value;
                changeGlobalState.change_PRISM_Categories(event.target.value);
                break;
            case TYPE.change_CRD_Categories:
                tempRisk.CRD_Categories = event.target.value;
                changeGlobalState.change_CRD_Categories(event.target.value);
                break;
            case TYPE.change_baselCategories:
                tempRisk.baselCategories = event.target.value;
                changeGlobalState.change_baselCategories(event.target.value);
                break;
            case TYPE.change_ICAAP_Categories:
                tempRisk.ICAAP_Categories = event.target.value;
                changeGlobalState.change_ICAAP_Categories(event.target.value);
                break;
            case TYPE.change_inherentRiskImpact:
                tempRisk.inherentRiskImpact = event.target.value;
                changeGlobalState.change_inherentRiskImpact(event.target.value);
                break;
            case TYPE.change_inherentRiskLikelihood:
                tempRisk.inherentRiskLikelihood = event.target.value;
                changeGlobalState.change_inherentRiskLikelihood(event.target.value);
                break;
            case TYPE.change_residualRiskImpact:
                tempRisk.residualRiskImpact = event.target.value;
                changeGlobalState.change_residualRiskImpact(event.target.value);
                break;
            case TYPE.change_residualRiskLikelihood:
                tempRisk.residualRiskLikelihood = event.target.value;
                changeGlobalState.change_residualRiskLikelihood(event.target.value);
                break;
            default:
                break;
        }
        if (getInherentRiskRating(tempRisk) !== "") {
            tempRisk.inherentRiskRating = getInherentRiskRating(tempRisk);
            changeGlobalState.change_inherentRiskRating(getInherentRiskRating(tempRisk));
        }
        if (getAppetiteRating(tempRisk)) {
            tempRisk.isBreachingRiskAppetite = tempRisk.residualRiskScore > tempRisk.riskAppetiteScore ? "Yes" : "No";
            tempRisk.residualRiskRating = getAppetiteRating(tempRisk);
            changeGlobalState.change_isBreachingRiskAppetite(tempRisk.residualRiskScore > tempRisk.riskAppetiteScore ? "Yes" : "No");
            changeGlobalState.change_residualRiskRating(getAppetiteRating(tempRisk));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper style={{ textAlign: 'center', padding: 16, margin: 'auto', maxWidth: 700 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} key="business_unit_name">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="business_unit_name-label" name="business_unit_name-label">  Business Unit Name</InputLabel>
                                    <Select native
                                        labelId="business_unit_name-label"
                                        id="business_unit_name"
                                        value={tempRisk.business_unit_name}
                                        onChange={(e) => handleChange(TYPE.change_business_unit_name, e)}
                                        ref={register({ required: true })}
                                    >
                                        <option value=""></option>
                                        <option value="BL - DMS Governance Ltd">BL - DMS Governance Ltd</option>
                                        <option value="BL - DMS Bank and Trust Ltd">BL - DMS Bank and Trust Ltd</option>
                                        <option value="BL - DMS Investment Management Services (Europe) Ltd">BL - DMS Investment Management Services (Europe) Ltd</option>
                                        <option value="AB - DMS FATCA Services Ltd">AB - DMS FATCA Services Ltd</option>
                                        <option value="AB - DMS Compliance Services">AB - DMS Compliance Services</option>
                                        <option value="AB - DMS Market Access Ltd">AB - DMS Market Access Ltd</option>
                                        <option value="AB - DMS Governance Risk & Compliance Services Ltd">AB - DMS Governance Risk & Compliance Services Ltd</option>
                                        <option value="AB - DMS Corporate Services Ltd">AB - DMS Corporate Services Ltd</option>
                                        <option value="AB - DMS Corporate Services (Ireland) Ltd">AB - DMS Corporate Services (Ireland) Ltd</option>
                                        <option value="AB - Host Capital Ltd">AB - Host Capital Ltd</option>
                                        <option value="AB - DMS Capital Solutions (UK) Ltd">AB - DMS Capital Solutions (UK) Ltd</option>
                                        <option value="AB - Investment Risk Services Ltd">AB - Investment Risk Services Ltd</option>
                                        <option value="CF - AML COE Teams">CF - AML COE Teams</option>
                                        <option value="CF - IT Team">CF - IT Team</option>
                                        <option value="CF - Compliance Team">CF - Compliance Team</option>
                                        <option value="CF - HR Team">CF - HR Team</option>
                                        <option value="CF - Finance Team">CF - Finance Team</option>
                                        <option value="CF - Audit Teams">CF - Audit Teams</option>
                                        <option value="CF - Business Development Team">CF - Business Development Team</option>
                                    </Select>
                                </FormControl>
                            }
                            name="business_unit_name_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} sm={6} key="business_unit_type">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true}>
                                    <TextField
                                        type="text"
                                        name="business_unit_type"
                                        label="Business Unit Type"
                                        value={tempRisk.business_unit_type}
                                        inputRef={register}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="business_unit_type_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} key="subRiskID">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField type="text" name="subRiskID"
                                        label="Sequential Number / Unique Sub-Risk ID"
                                        value={tempRisk.subRiskID}
                                        inputRef={register}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="subRiskID_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="riskPillar">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="riskPillar-label" name="riskPillar-label">  Risk Pillar</InputLabel>
                                    <Select native name="riskPillar" labelId="riskPillar-label"
                                        id="riskPillar"
                                        value={tempRisk.riskPillar}
                                        onChange={(e) => handleChange(TYPE.change_riskPillar, e)}
                                        ref={register({ required: true })}
                                    >
                                        <option value=""></option>
                                        <option value="Operational">Operational</option>
                                        <option value="Financial">Financial</option>
                                        <option value="Regulatory">Regulatory</option>
                                        <option value="Core Function">Core Function</option>
                                    </Select>
                                </FormControl>
                            }
                            name="riskPillar_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="riskCategory">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="riskCategory-label" name="riskCategory-label">  Risk Category</InputLabel>
                                    <Select native name="riskCategory" labelId="riskCategory-label"
                                        id="riskCategory"
                                        value={tempRisk.riskCategory}
                                        onChange={(e) => handleChange(TYPE.change_riskCategory, e)}
                                        ref={register({ required: true })}
                                    >
                                        <option value=""></option >
                                        <optgroup label="Risk Category - Operational">
                                            <option value="Operational - Governance Risk">Governance Risk</option>
                                            <option value="Operational - Key Person/ Resourcing Risk">Key Person/ Resourcing Risk</option>
                                            <option value="Operational - Supervision of Third Parties Risk">Supervision of Third Parties Risk</option>
                                            <option value="Operational - Business Continuity Planning Risk">Business Continuity Planning Risk</option>
                                            <option value="Operational - Data Risk">Data Risk</option>
                                            <option value="Operational - IT/ Cybersecurity Risk">IT/ Cybersecurity Risk</option>
                                            <option value="Operational - Geopolitical Risk">Geopolitical Risk</option>
                                        </optgroup>
                                        <optgroup label="Risk Category - Financial">
                                            <option value="Financial - Finance Risk">Finance Risk</option>
                                            <option value="Financial - Regulatory Capital Risk">Regulatory Capital Risk</option>
                                            <option value="Financial - Insurance Risk">Insurance Risk</option>
                                            <option value="Financial - New Business / Product Risk">New Business / Product Risk</option>
                                            <option value="Financial - Market Risk">Market Risk</option>
                                            <option value="Financial - Currency Risk">Currency Risk</option>
                                            <option value="Financial - Strategic Risk">Strategic Risk</option>
                                            <option value="Financial - Reputational Risk">Reputational Risk</option>
                                        </optgroup>
                                        <optgroup label="Risk Category - Regulatory">
                                            <option value="Regulatory - Compliance Risk">Compliance Risk</option>
                                            <option value="Regulatory - Regulatory Change Risk">Regulatory Change Risk</option>
                                            <option value="Regulatory - Anti Money Laundering & CTF Risk">Anti Money Laundering & CTF Risk</option>
                                            <option value="Regulatory - Legal Risk">Legal Risk</option>
                                        </optgroup>
                                        <optgroup label="Risk Category - Core Function">
                                            <option value="Core Function - AML COE Team Risk">AML COE Team Risk</option>
                                            <option value="Core Function - Compliance Team Risk">Compliance Team Risk</option>
                                            <option value="Core Function - IT Team Risk">IT Team Risk</option>
                                            <option value="Core Function - HR Team Risk">HR Team Risk</option>
                                            <option value="Core Function - Finance Team Risk">Finance Team Risk</option>
                                            <option value="Core Function - Business Development Team Risk">Business Development Team Risk</option>
                                            <option value="Core Function - Audit Team Risk">Audit Team Risk</option>
                                        </optgroup>
                                    </Select>
                                </FormControl>
                            }
                            name="riskCategory_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="riskCategoryDesc">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="riskCategoryDesc"
                                        label="Risk Category Description"
                                        name="riskCategoryDesc"
                                        multiline
                                        rows="8"
                                        value={tempRisk.riskCategoryDesc}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        inputRef={register}
                                    />
                                </FormControl>
                            }
                            name="riskCategoryDesc_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="subRiskName">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField type="text"
                                        name="subRiskName"
                                        label="Sub Risk Name"
                                        value={tempRisk.subRiskName}
                                        onChange={(e) => handleChange(TYPE.change_subRiskName, e)}
                                        inputRef={register}
                                        variant="outlined"
                                    />
                                </FormControl>
                            }
                            name="subRiskName_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="subRiskDesc">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="subRiskDesc"
                                        name="subRiskDesc"
                                        label="Sub Risk Description"
                                        multiline
                                        rows="6"
                                        value={tempRisk.subRiskDesc}
                                        variant="outlined"
                                        onChange={(e) => handleChange(TYPE.change_subRiskDesc, e)}
                                        inputRef={register}
                                    />
                                </FormControl>
                            }
                            name="subRiskDesc_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="riskOwner">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="riskOwner-label" name="riskOwner-label">  Risk Owner</InputLabel>
                                    <Select native
                                        labelId="riskOwner-label"
                                        id="riskOwner"
                                        value={tempRisk.riskOwner}
                                        onChange={(e) => handleChange(TYPE.change_riskOwner, e)}
                                        ref={register({ required: true })}
                                        name="riskOwner"
                                    >
                                        <option value=""></option>
                                        <option value="Mignon O'Corrigane">Mignon O'Corrigane</option>
                                        <option value="Suzi MacAllan">Suzi MacAllan</option>
                                        <option value="Catha Morritt">Catha Morritt</option>
                                        <option value="Wolfgang Potteril">Wolfgang Potteril</option>
                                        <option value="Pasquale Igo">Pasquale Igo</option>
                                    </Select>
                                </FormControl>
                            }
                            name="riskOwner_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="dateAdded">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="dateAdded"
                                        name="dateAdded"
                                        label="Date Added"
                                        value={changeGlobalState.row.dateAdded}
                                        variant="outlined"
                                        inputRef={register}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="dateAdded_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="regulatedBU">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField type="text"
                                        name="regulatedBU"
                                        label="Regulated BU"
                                        value={tempRisk.regulatedBU}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        inputRef={register}
                                        variant="outlined"
                                    />
                                </FormControl>
                            }
                            name="regulatedBU_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="regulatoryFramework">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField type="text"
                                        name="regulatoryFramework"
                                        label="Regulatory Framework"
                                        value={tempRisk.regulatoryFramework}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        inputRef={register}
                                        variant="outlined"
                                    />
                                </FormControl>
                            }
                            name="regulatoryFramework_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="PRISM_Categories">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="PRISM_Categories-chip-label" name="PRISM_Categories-chip-label">  PRISM Categories</InputLabel>
                                    <Select
                                        labelId="PRISM_Categories-chip-label"
                                        id="PRISM_Categories-chip"
                                        name="PRISM_Categories"
                                        multiple
                                        value={tempRisk.PRISM_Categories}
                                        onChange={(e) => handleChange(TYPE.change_PRISM_Categories, e)}
                                        input={<Input id="select-multiple-chip" key="select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        ref={register({ required: true })}
                                    >
                                        <MenuItem key="N/A" value="N/A">N/A</MenuItem>
                                        <MenuItem key="Credit Risk" value="Credit Risk">Credit Risk</MenuItem>
                                        <MenuItem key="Market Risk" value="Market Risk">Market Risk</MenuItem>
                                        <MenuItem key="Operational Risk" value="Operational Risk">Operational Risk</MenuItem>
                                        <MenuItem key="Insurance Risk" value="Insurance Risk">Insurance Risk</MenuItem>
                                        <MenuItem key="Capital Risk" value="Capital Risk">Capital Risk</MenuItem>
                                        <MenuItem key="Liquidity Risk" value="Liquidity Risk">Liquidity Risk</MenuItem>
                                        <MenuItem key="Governance Risk" value="Governance Risk">Governance Risk</MenuItem>
                                        <MenuItem key="Strategy/ Business Model Risk" value="Strategy/ Business Model Risk">Strategy/ Business Model Risk</MenuItem>
                                        <MenuItem key="Environmental Risk" value="Environmental Risk">Environmental Risk</MenuItem>
                                        <MenuItem key="Conduct Risk" value="Conduct Risk">Conduct Risk</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            name="PRISM_Categories_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="CRD_Categories">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="CRD_Categories-chip-label" name="CRD_Categories-chip-label">  CRD Categories</InputLabel>
                                    <Select
                                        labelId="CRD_Categories-chip-label"
                                        id="CRD_Categories-chip"
                                        name="CRD_Categories"
                                        multiple
                                        value={tempRisk.CRD_Categories}
                                        onChange={(e) => handleChange(TYPE.change_CRD_Categories, e)}
                                        input={<Input id="CRD_Categories-select-multiple-chip" key="CRD_Categories-select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        ref={register({ required: true })}
                                    >
                                        <MenuItem key="CRD_Categories_N/A" value="N/A">N/A</MenuItem>
                                        <MenuItem key="CRD_Categories_Credit Risk" value="Credit Risk">Credit Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Market Risk" value="Market Risk">Market Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Operational Risk" value="Operational Risk">Operational Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Insurance Risk" value="Insurance Risk">Insurance Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Capital Risk" value="Capital Risk">Capital Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Liquidity Risk" value="Liquidity Risk">Liquidity Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Governance Risk" value="Governance Risk">Governance Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Strategy/ Business Model Risk" value="Strategy/ Business Model Risk">Strategy/ Business Model Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Environmental Risk" value="Environmental Risk">Environmental Risk</MenuItem>
                                        <MenuItem key="CRD_Categories_Conduct Risk" value="Conduct Risk">Conduct Risk</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            name="CRD_Categories_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="baselCategories">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="baselCategories-chip-label" name="baselCategories-chip-label">  Basel Categories</InputLabel>
                                    <Select
                                        labelId="baselCategories-chip-label"
                                        id="baselCategories-chip"
                                        name="baselCategories"
                                        multiple
                                        value={tempRisk.baselCategories}
                                        onChange={(e) => handleChange(TYPE.change_baselCategories, e)}
                                        input={<Input id="baselCategories-select-multiple-chip" key="baselCategories-select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        ref={register({ required: true })}
                                    >
                                        <MenuItem key="baselCategories_N/A" value="N/A">N/A</MenuItem>
                                        <MenuItem key="baselCategories_Credit Risk" value="Credit Risk">Credit Risk</MenuItem>
                                        <MenuItem key="baselCategories_Market Risk" value="Market Risk">Market Risk</MenuItem>
                                        <MenuItem key="baselCategories_Operational Risk" value="Operational Risk">Operational Risk</MenuItem>
                                        <MenuItem key="baselCategories_Insurance Risk" value="Insurance Risk">Insurance Risk</MenuItem>
                                        <MenuItem key="baselCategories_Capital Risk" value="Capital Risk">Capital Risk</MenuItem>
                                        <MenuItem key="baselCategories_Liquidity Risk" value="Liquidity Risk">Liquidity Risk</MenuItem>
                                        <MenuItem key="baselCategories_Governance Risk" value="Governance Risk">Governance Risk</MenuItem>
                                        <MenuItem key="baselCategories_Strategy/ Business Model Risk" value="Strategy/ Business Model Risk">Strategy/ Business Model Risk</MenuItem>
                                        <MenuItem key="baselCategories_Environmental Risk" value="Environmental Risk">Environmental Risk</MenuItem>
                                        <MenuItem key="baselCategories_Conduct Risk" value="Conduct Risk">Conduct Risk</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            name="baselCategories_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="ICAAP_Categories">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="ICAAP_Categories-chip-label" name="ICAAP_Categories-chip-label">  ICAAP Categories</InputLabel>
                                    <Select
                                        labelId="ICAAP_Categories-chip-label"
                                        id="ICAAP_Categories-chip"
                                        name="ICAAP_Categories"
                                        multiple
                                        value={tempRisk.ICAAP_Categories}
                                        onChange={(e) => handleChange(TYPE.change_ICAAP_Categories, e)}
                                        input={<Input id="ICAAP_Categories-select-multiple-chip" key="ICAAP_Categories-select-multiple-chip" />}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        ref={register({ required: true })}
                                    >
                                        <MenuItem key="ICAAP_Categories_N/A" value="N/A">N/A</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Credit Risk" value="Credit Risk">Credit Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Market Risk" value="Market Risk">Market Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Operational Risk" value="Operational Risk">Operational Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Insurance Risk" value="Insurance Risk">Insurance Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Capital Risk" value="Capital Risk">Capital Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Liquidity Risk" value="Liquidity Risk">Liquidity Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Governance Risk" value="Governance Risk">Governance Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Strategy/ Business Model Risk" value="Strategy/ Business Model Risk">Strategy/ Business Model Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Environmental Risk" value="Environmental Risk">Environmental Risk</MenuItem>
                                        <MenuItem key="ICAAP_Categories_Conduct Risk" value="Conduct Risk">Conduct Risk</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            name="ICAAP_Categories_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} sm={6} key="inherentRiskImpact">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="inherentRiskImpact-label" name="inherentRiskImpact-label">  Inherent Risk Impact</InputLabel>
                                    <Select native
                                        labelId="inherentRiskImpact-label"
                                        id="inherentRiskImpact"
                                        value={tempRisk.inherentRiskImpact}
                                        onChange={(e) => handleChange(TYPE.change_inherentRiskImpact, e)}
                                        ref={register({ required: true })}
                                        name="inherentRiskImpact"
                                    >
                                        <option value=""></option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </Select>
                                </FormControl>
                            }
                            name="inherentRiskImpact_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} sm={6} key="inherentRiskLikelihood">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="inherentRiskLikelihood-label" name="inherentRiskLikelihood-label">  Inherent Risk Likelihood</InputLabel>
                                    <Select native
                                        labelId="inherentRiskLikelihood-label"
                                        id="inherentRiskLikelihood"
                                        value={tempRisk.inherentRiskLikelihood}
                                        onChange={(e) => handleChange(TYPE.change_inherentRiskLikelihood, e)}
                                        ref={register({ required: true })}
                                        name="inherentRiskLikelihood"
                                    >
                                        <option value=""></option>
                                        <option value="Likely">Likely</option>
                                        <option value="Possible">Possible</option>
                                        <option value="Unlikely">Unlikely</option>
                                    </Select>

                                </FormControl>
                            }
                            name="inherentRiskLikelihood_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="inherentRiskRating">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="inherentRiskRating"
                                        name="inherentRiskRating"
                                        label="Inherent Risk Rating"
                                        value={tempRisk.inherentRiskRating}
                                        variant="outlined"
                                        inputRef={register}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="inherentRiskRating_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} key="residualRiskImpact">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="residualRiskImpact-label" name="residualRiskImpact-label">  Residual Risk Impact</InputLabel>
                                    <Select native
                                        labelId="residualRiskImpact-label"
                                        id="residualRiskImpact"
                                        value={tempRisk.residualRiskImpact}
                                        onChange={(e) => handleChange(TYPE.change_residualRiskImpact, e)}
                                        ref={register({ required: true })}
                                        name="residualRiskImpact"
                                    >
                                        <option value=""></option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </Select>
                                </FormControl>
                            }
                            name="residualRiskImpact_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} sm={6} key="residualRiskLikelihood">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                                    <InputLabel id="residualRiskLikelihood-label" name="residualRiskLikelihood-label">  Residual Risk Likelihood</InputLabel>
                                    <Select native
                                        labelId="residualRiskLikelihood-label"
                                        id="residualRiskLikelihood"
                                        value={tempRisk.residualRiskLikelihood}
                                        onChange={(e) => handleChange(TYPE.change_residualRiskLikelihood, e)}
                                        ref={register({ required: true })}
                                        name="residualRiskLikelihood"
                                    >
                                        <option value=""></option>
                                        <option value="Likely">Likely</option>
                                        <option value="Possible">Possible</option>
                                        <option value="Unlikely">Unlikely</option>
                                    </Select>
                                </FormControl>
                            }
                            name="residualRiskLikelihood_control"
                            control={control}
                        />
                        {errors.singleErrorInput && "Your Selection is required"}
                    </Grid>
                    <Grid item xs={12} key="residualRiskRating">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="residualRiskRating"
                                        name="residualRiskRating"
                                        label="Residual Risk Rating"
                                        value={tempRisk.residualRiskRating}
                                        variant="outlined"
                                        inputRef={register}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="residualRiskRating_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="groupRiskAppetite">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="groupRiskAppetite"
                                        name="groupRiskAppetite"
                                        label="Group Risk Appetite"
                                        value={tempRisk.groupRiskAppetite}
                                        variant="outlined"
                                        inputRef={register}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="groupRiskAppetite_control"
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} key="isBreachingRiskAppetite">
                        <Controller
                            as={
                                <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                    <TextField
                                        id="isBreachingRiskAppetite"
                                        name="isBreachingRiskAppetite"
                                        label="Is the Residual Risk Rating breaching Risk Appetite"
                                        value={tempRisk.isBreachingRiskAppetite}
                                        variant="outlined"
                                        inputRef={register}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </FormControl>
                            }
                            name="isBreachingRiskAppetite_control"
                            control={control}
                        />
                    </Grid>
                    {{/*(
                        <pre style={{ textAlign: "left", color: "black" }}>
                            {JSON.stringify(changeGlobalState, null, 3)}
                        </pre>
                    )*/}}
                    {{/*(
                        <pre style={{ textAlign: "right", color: "black" }}>
                            {JSON.stringify(tempRisk, null, 2)}
                        </pre>
                    )*/}}
                </Grid>
            </Paper>
        </form >

    );
}