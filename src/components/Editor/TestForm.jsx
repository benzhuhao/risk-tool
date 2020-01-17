import React, {useCallback, useMemo, useEffect, useRef} from 'react';
import { useGlobalState } from '../GlobalReducer/GlobalState';
import { TYPE } from '../GlobalReducer/RiskMatrixReducer';
import {
    Paper, 
    Grid, 
    FormControl, 
    makeStyles, 
    InputLabel, 
    Select, 
    MenuItem, 
    TextField, 
    Chip, 
    Input, 
    Button, 
    Icon,
} from '@material-ui/core';
import { business_unit_name_mapper, riskCategoryMapper, ratingMapper } from '../Mapper';
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
    riskCategoryIndex: 0,
}

const getTimeNow = () => {
    return moment().format();
}

const getBusinessUnitValue = (watchValue) => {
    const head = watchValue.split(" - ", 1);
    return business_unit_name_mapper[head];
}

const getRiskCategory = (category) => {
    const head = category.split(" - ");
    const index = riskCategoryMapper.findIndex(elem => elem.category === head[1]);
    tempRisk.riskCategoryIndex = index + 1;
    return riskCategoryMapper[index].description;
}

const getGroupRiskAppetite = (category) => {
    const head = category.split(" - ");
    const item = riskCategoryMapper.find(elem => elem.category === head[1]);
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

const getRiskID = () => {
    let bu = tempRisk.business_unit_name.split(" - ", 1);
    let pillar = tempRisk.riskPillar.charAt(0);
    let pillarIndex = function() {
        switch(pillar) {
            case 'O': return 1; 
            case 'F': return 2;
            case 'R': return 3;
            case 'C': return 4;
            default:
                return 0;
        } 
    };
    if(tempRisk.riskCategoryIndex === 0) {
        getRiskCategory(tempRisk.riskCategory);
    }
    let riskCatIndex = tempRisk.riskCategoryIndex > 9 ? tempRisk.riskCategoryIndex : '0' + tempRisk.riskCategoryIndex;

    return bu + '-' + pillar + '-' + pillarIndex() + '-' + riskCatIndex + '-01';
}

export default function TestForm() {
    const classes = useStyles();
    
    const changeGlobalState = useGlobalState();
    tempRisk = { ...changeGlobalState.row };
    tempRisk.dateAdded = getTimeNow();
    
    const handleSubRiskNameChange = (event) => {
        tempRisk.subRiskName = event.target.value;
        changeGlobalState.change_subRiskName(event.target.value);
    }
    const handleSubRiskDiscChange = (event) => {
        tempRisk.subRiskDesc = event.target.value;
        changeGlobalState.change_subRiskDesc(event.target.value);
    }
    /*
        function useFormImput(initValue) {
            const [value, setValue] = useState(initValue);
            function handleChange(e) {
                setValue(e.target.value);
            }
            return {
                value,
                onChange: handleChange
            }
        }
        ==============================
        const name = useFormInput('mary');
        <input {...name} />
    */
    const handleChange = (type, event) => {
        
        switch (type) {
            case TYPE.change_business_unit_name:
                tempRisk.business_unit_name = event.target.value;
                changeGlobalState.change_business_unit_name(event.target.value);
            // business unit name determined the business unit type, so no key word break;
            // eslint-disable-next-line no-fallthrough
            case TYPE.change_business_unit_type:
                tempRisk.business_unit_type = event.target.value;
                changeGlobalState.change_business_unit_type(getBusinessUnitValue(event.target.value));
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
            // eslint-disable-next-line no-fallthrough
            case TYPE.change_subRiskID:
                tempRisk.subRiskID = getRiskID(); //"ABL-R-1-22-33";
                changeGlobalState.change_subRiskID(tempRisk.subRiskID);
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
    
    // eslint-plugin-react-hooks exhaustive-deps
    // useCallback(() => {
    //         handleChange
    //     },[type, event]);

    return (
        <Paper style={{ textAlign: 'center', padding: 16, margin: 'auto', maxWidth: 700 }}>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} key="business_unit_name">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel htmlFor="business_unit_name-label" name="business_unit_name-label">  Business Unit Name</InputLabel>
                        <Select native
                            labelId="business_unit_name-label"
                            id="business_unit_name"
                            value={tempRisk.business_unit_name}
                            onChange={(e) => handleChange(TYPE.change_business_unit_name, e)}
                            labelWidth={160}
                        >
                            <option value=""></option>
                            <option value="BL - DMS Governance Ltd">BL - DMS Governance Ltd</option>
                            <option value="BL - DMS Bank and Trust Ltd">BL - DMS Bank and Trust Ltd</option>
                            <option value="BL - DMS Investment Management Services (Europe) Ltd">BL - DMS Investment Management Services (Europe) Ltd</option>
                            <option value="ABL - DMS FATCA Services Ltd">AB - DMS FATCA Services Ltd</option>
                            <option value="ABL - DMS Compliance Services">AB - DMS Compliance Services</option>
                            <option value="ABL - DMS Market Access Ltd">AB - DMS Market Access Ltd</option>
                            <option value="ABL - DMS Governance Risk & Compliance Services Ltd">AB - DMS Governance Risk & Compliance Services Ltd</option>
                            <option value="ABL - DMS Corporate Services Ltd">AB - DMS Corporate Services Ltd</option>
                            <option value="ABL - DMS Corporate Services (Ireland) Ltd">AB - DMS Corporate Services (Ireland) Ltd</option>
                            <option value="ABL - Host Capital Ltd">AB - Host Capital Ltd</option>
                            <option value="ABL - DMS Capital Solutions (UK) Ltd">AB - DMS Capital Solutions (UK) Ltd</option>
                            <option value="ABL - Investment Risk Services Ltd">AB - Investment Risk Services Ltd</option>
                            <option value="CF - AML COE Teams">CF - AML COE Teams</option>
                            <option value="CF - IT Team">CF - IT Team</option>
                            <option value="CF - Compliance Team">CF - Compliance Team</option>
                            <option value="CF - HR Team">CF - HR Team</option>
                            <option value="CF - Finance Team">CF - Finance Team</option>
                            <option value="CF - Audit Teams">CF - Audit Teams</option>
                            <option value="CF - Business Development Team">CF - Business Development Team</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} key="business_unit_type">
                    <FormControl className={classes.formControl} fullWidth={true}>
                        <TextField
                            type="text"
                            name="business_unit_type"
                            label="Business Unit Type"
                            value={tempRisk.business_unit_type}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} key="subRiskID">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField type="text" name="subRiskID"
                            label="Sequential Number / Unique Sub-Risk ID"
                            value={tempRisk.subRiskID}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="riskPillar">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="riskPillar-label" name="riskPillar-label">  Risk Pillar</InputLabel>
                        <Select native name="riskPillar" labelId="riskPillar-label"
                            id="riskPillar"
                            value={tempRisk.riskPillar}
                            onChange={(e) => handleChange(TYPE.change_riskPillar, e)}
                            labelWidth={90}
                        >
                            <option value=""></option>
                            <option value="Operational">Operational</option>
                            <option value="Financial">Financial</option>
                            <option value="Regulatory">Regulatory</option>
                            <option value="Core Function">Core Function</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="riskCategory">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="riskCategory-label" name="riskCategory-label">  Risk Category</InputLabel>
                        <Select native name="riskCategory" labelId="riskCategory-label"
                            id="riskCategory"
                            value={tempRisk.riskCategory}
                            onChange={(e) => handleChange(TYPE.change_riskCategory, e)}
                            labelWidth={120}
                        >
                            <option value=""></option>
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
                </Grid>
                <Grid item xs={12} key="riskCategoryDesc">
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
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="subRiskName">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField type="text"
                            name="subRiskName"
                            label="Sub Risk Name"
                            value={tempRisk.subRiskName}
                            onChange={handleSubRiskNameChange/*(e) => handleChange(TYPE.change_subRiskName, e)*/}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="subRiskDesc">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField
                            id="subRiskDesc"
                            name="subRiskDesc"
                            label="Sub Risk Description"
                            multiline
                            rows="6"
                            value={tempRisk.subRiskDesc}
                            variant="outlined"
                            onChange={handleSubRiskDiscChange/*(e) => handleChange(TYPE.change_subRiskDesc, e)*/}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="riskOwner">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="riskOwner-label" name="riskOwner-label">  Risk Owner</InputLabel>
                        <Select native
                            labelId="riskOwner-label"
                            id="riskOwner"
                            value={tempRisk.riskOwner}
                            onChange={(e) => handleChange(TYPE.change_riskOwner, e)}
                            name="riskOwner"
                            labelWidth={100}
                        >
                            <option value=""></option>
                            <option value="Mignon O'Corrigane">Mignon O'Corrigane</option>
                            <option value="Suzi MacAllan">Suzi MacAllan</option>
                            <option value="Catha Morritt">Catha Morritt</option>
                            <option value="Wolfgang Potteril">Wolfgang Potteril</option>
                            <option value="Pasquale Igo">Pasquale Igo</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="dateAdded">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField
                            id="dateAdded"
                            name="dateAdded"
                            label="Date Added"
                            value={tempRisk.dateAdded}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="regulatedBU">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField type="text"
                            name="regulatedBU"
                            label="Regulated BU"
                            value={tempRisk.regulatedBU}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="regulatoryFramework">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField type="text"
                            name="regulatoryFramework"
                            label="Regulatory Framework"
                            value={tempRisk.regulatoryFramework}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="PRISM_Categories">
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
                </Grid>
                <Grid item xs={12} key="CRD_Categories">
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
                </Grid>
                <Grid item xs={12} key="baselCategories">
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
                </Grid>
                <Grid item xs={12} key="ICAAP_Categories">
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
                </Grid>
                <Grid item xs={12} sm={6} key="inherentRiskImpact">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="inherentRiskImpact-label" name="inherentRiskImpact-label">  Inherent Risk Impact</InputLabel>
                        <Select native
                            labelId="inherentRiskImpact-label"
                            id="inherentRiskImpact"
                            value={tempRisk.inherentRiskImpact}
                            onChange={(e) => handleChange(TYPE.change_inherentRiskImpact, e)}
                            name="inherentRiskImpact"
                            labelWidth={170}
                        >
                            <option value=""></option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} key="inherentRiskLikelihood">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="inherentRiskLikelihood-label" name="inherentRiskLikelihood-label">  Inherent Risk Likelihood</InputLabel>
                        <Select native
                            labelId="inherentRiskLikelihood-label"
                            id="inherentRiskLikelihood"
                            value={tempRisk.inherentRiskLikelihood}
                            onChange={(e) => handleChange(TYPE.change_inherentRiskLikelihood, e)}
                            name="inherentRiskLikelihood"
                            labelWidth={188}
                        >
                            <option value=""></option>
                            <option value="Likely">Likely</option>
                            <option value="Possible">Possible</option>
                            <option value="Unlikely">Unlikely</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="inherentRiskRating">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField
                            id="inherentRiskRating"
                            name="inherentRiskRating"
                            label="Inherent Risk Rating"
                            value={tempRisk.inherentRiskRating}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} key="residualRiskImpact">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="residualRiskImpact-label" name="residualRiskImpact-label">  Residual Risk Impact</InputLabel>
                        <Select native
                            labelId="residualRiskImpact-label"
                            id="residualRiskImpact"
                            value={tempRisk.residualRiskImpact}
                            onChange={(e) => handleChange(TYPE.change_residualRiskImpact, e)}
                            name="residualRiskImpact"
                            labelWidth={170}
                        >
                            <option value=""></option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} key="residualRiskLikelihood">
                    <FormControl className={classes.formControl} fullWidth={true} required={true} variant='outlined'>
                        <InputLabel id="residualRiskLikelihood-label" name="residualRiskLikelihood-label">  Residual Risk Likelihood</InputLabel>
                        <Select native
                            labelId="residualRiskLikelihood-label"
                            id="residualRiskLikelihood"
                            value={tempRisk.residualRiskLikelihood}
                            onChange={(e) => handleChange(TYPE.change_residualRiskLikelihood, e)}
                            name="residualRiskLikelihood"
                            labelWidth={188}
                        >
                            <option value=""></option>
                            <option value="Likely">Likely</option>
                            <option value="Possible">Possible</option>
                            <option value="Unlikely">Unlikely</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="residualRiskRating">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField
                            id="residualRiskRating"
                            name="residualRiskRating"
                            label="Residual Risk Rating"
                            value={tempRisk.residualRiskRating}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="groupRiskAppetite">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField
                            id="groupRiskAppetite"
                            name="groupRiskAppetite"
                            label="Group Risk Appetite"
                            value={tempRisk.groupRiskAppetite}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} key="isBreachingRiskAppetite">
                    <FormControl className={classes.formControl} fullWidth={true} required={true}>
                        <TextField
                            id="isBreachingRiskAppetite"
                            name="isBreachingRiskAppetite"
                            label="Is the Residual Risk Rating breaching Risk Appetite"
                            value={tempRisk.isBreachingRiskAppetite}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
}