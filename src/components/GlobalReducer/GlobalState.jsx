import React, { createContext, useContext, useReducer } from 'react'
import RiskMatrixReducer, { TYPE } from './RiskMatrixReducer'

// should add ID for row and rows in table
const initialState = {
    row: {
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
    },
    table: [{
        riskPillar: "Operational",
        riskCategory: "Operational - Governance Risk",
        subRiskID: "BAT-R-1-01-01",
        subRiskName: "Policies and procedures",
        subRiskDesc: "Annually, policies and procedures are reviewed by each team and any updates are made to the policies and procedures. Any policy updates must be approved at the Board Level and procedure updates must be approved at a minimum the Director level. ",
        riskOwner: "MD DMS Bank & Trust; A. Rossiter",
        dateAdded: "2019/12/17",
        regulatedBU: "Yes",
        regulatoryFramework: "Basel",
        PRISM_Categories: ["N/A"],
        CRD_Categories: ["N/A"],
        baselCategories: ["Show selection of risk categories chosen"],
        ICAAP_Categories: ["N/A"],
        inherentRiskImpact: "High",
        inherentRiskLikelihood: "Likely",
        inherentRiskRating: "Material (3C)",
        riskMitigantDesc: "Policies and procedures have been designed to ensure that DMS meets its legal and regulatory obligations and that group standards in terms of documentation, filing and reporting are maintained.  The risk is that employees do not follow the set policies and procedures due to lack of knowledge, lack of training or lack of understanding of the importance of these key controls and as a result a breach or error occurs which negatively impacts DMS and/or its clients.  Maintaining and updating changes to procedures have not been formally documented and/or approved.",
        controlRefNums: "",
        residualRiskImpact: "High",
        residualRiskLikelihood: "Unlikely",
        residualRiskRating: "Significant (3A)",
        groupRiskAppetite: "Low",
        isBreachingRiskAppetite: "Yes",
    }, {
        riskPillar: "Operational",
        riskCategory: "Operational - Business Continuity Planning Risk",
        subRiskID: "BAT-R-2-01-01",
        subRiskName: "Policies and procedures",
        subRiskDesc: "Annually, policies and procedures are reviewed by each team and any updates are made to the policies and procedures. Any policy updates must be approved at the Board Level and procedure updates must be approved at a minimum the Director level. ",
        riskOwner: "MD DMS Bank & Trust; A. Rossiter",
        dateAdded: "2019/12/17",
        regulatedBU: "Yes",
        regulatoryFramework: "Basel",
        PRISM_Categories: ["N/A"],
        CRD_Categories: ["N/A"],
        baselCategories: ["Show selection of risk categories chosen"],
        ICAAP_Categories: ["N/A"],
        inherentRiskImpact: "High",
        inherentRiskLikelihood: "Likely",
        inherentRiskRating: "Material (3C)",
        riskMitigantDesc: "Policies and procedures have been designed to ensure that DMS meets its legal and regulatory obligations and that group standards in terms of documentation, filing and reporting are maintained.  The risk is that employees do not follow the set policies and procedures due to lack of knowledge, lack of training or lack of understanding of the importance of these key controls and as a result a breach or error occurs which negatively impacts DMS and/or its clients.  Maintaining and updating changes to procedures have not been formally documented and/or approved.",
        controlRefNums: "",
        residualRiskImpact: "High",
        residualRiskLikelihood: "Unlikely",
        residualRiskRating: "Significant (3A)",
        groupRiskAppetite: "Low",
        isBreachingRiskAppetite: "Yes",
    }],
    riskRegFormOpen: false,
};

export const GlobalStateContext = createContext(initialState);

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(RiskMatrixReducer, initialState);

    return (
        <GlobalStateContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);

    const setRiskRegFormOpen = (open) => {
        dispatch({
            type: TYPE.setRiskRegFormOpen,
            payload: open
        });
    };
    const setRow = (row) => {
        dispatch({
            type: TYPE.setRow,
            payload: row
        })
    }
    const addRowInTable = (row) => {
        dispatch({
            type: TYPE.addRow,
            payload: row
        })
    }

    const deleteRowInTable = (row) => {
        dispatch({
            type: TYPE.deleteRow,
            payload: row
        })
    }

    const change_business_unit_name = (business_unit_name) => {
        dispatch({
            type: TYPE.change_business_unit_name,
            payload: business_unit_name
        });

    }

    const change_business_unit_type = (business_unit_type) => {
        dispatch({
            type: TYPE.change_business_unit_type,
            payload: business_unit_type
        });

    }
    const change_subRiskID = (subRiskID) => {
        dispatch({
            type: TYPE.change_subRiskID,
            payload: subRiskID
        });

    };
    const change_riskPillar = (riskPillar) => {
        dispatch({
            type: TYPE.change_riskPillar,
            payload: riskPillar
        });

    };
    const change_riskCategory = (riskCategory) => {
        dispatch({
            type: TYPE.change_riskCategory,
            payload: riskCategory
        });

    };
    const change_riskCategoryDesc = (riskCategoryDesc) => {
        dispatch({
            type: TYPE.change_riskCategoryDesc,
            payload: riskCategoryDesc
        });

    };
    const change_subRiskName = (subRiskName) => {
        dispatch({
            type: TYPE.change_subRiskName,
            payload: subRiskName
        });

    };
    const change_subRiskDesc = (subRiskDesc) => {
        dispatch({
            type: TYPE.change_subRiskDesc,
            payload: subRiskDesc
        });

    };
    const change_riskOwner = (riskOwner) => {
        dispatch({
            type: TYPE.change_riskOwner,
            payload: riskOwner
        });

    };
    const change_dateAdded = (dateAdded) => {
        dispatch({
            type: TYPE.change_dateAdded,
            payload: dateAdded
        });

    };
    const change_regulatedBU = (regulatedBU) => {
        dispatch({
            type: TYPE.change_regulatedBU,
            payload: regulatedBU
        });

    };
    const change_regulatoryFramework = (regulatoryFramework) => {
        dispatch({
            type: TYPE.change_regulatoryFramework,
            payload: regulatoryFramework
        });

    };
    const change_PRISM_Categories = (PRISM_Categories) => {
        dispatch({
            type: TYPE.change_PRISM_Categories,
            payload: PRISM_Categories
        });

    };
    const change_CRD_Categories = (CRD_Categories) => {
        dispatch({
            type: TYPE.change_CRD_Categories,
            payload: CRD_Categories
        });

    };
    const change_baselCategories = (baselCategories) => {
        dispatch({
            type: TYPE.change_baselCategories,
            payload: baselCategories
        });

    };
    const change_ICAAP_Categories = (ICAAP_Categories) => {
        dispatch({
            type: TYPE.change_ICAAP_Categories,
            payload: ICAAP_Categories
        });

    };
    const change_inherentRiskImpact = (inherentRiskImpact) => {
        dispatch({
            type: TYPE.change_inherentRiskImpact,
            payload: inherentRiskImpact
        });

    };
    const change_inherentRiskLikelihood = (inherentRiskLikelihood) => {
        dispatch({
            type: TYPE.change_inherentRiskLikelihood,
            payload: inherentRiskLikelihood
        });

    };
    const change_inherentRiskRating = (inherentRiskRating) => {
        dispatch({
            type: TYPE.change_inherentRiskRating,
            payload: inherentRiskRating
        });

    };
    const change_residualRiskImpact = (residualRiskImpact) => {
        dispatch({
            type: TYPE.change_residualRiskImpact,
            payload: residualRiskImpact
        });

    };
    const change_residualRiskLikelihood = (residualRiskLikelihood) => {
        dispatch({
            type: TYPE.change_residualRiskLikelihood,
            payload: residualRiskLikelihood
        });

    };
    const change_residualRiskRating = (residualRiskRating) => {
        dispatch({
            type: TYPE.change_residualRiskRating,
            payload: residualRiskRating
        });

    };
    const change_groupRiskAppetite = (groupRiskAppetite) => {
        dispatch({
            type: TYPE.change_groupRiskAppetite,
            payload: groupRiskAppetite
        });

    };
    const change_isBreachingRiskAppetite = (isBreachingRiskAppetite) => {
        dispatch({
            type: TYPE.change_isBreachingRiskAppetite,
            payload: isBreachingRiskAppetite
        });

    };
    return {
        change_business_unit_name,
        change_business_unit_type,
        change_subRiskID,
        change_riskPillar,
        change_riskCategory,
        change_riskCategoryDesc,
        change_subRiskName,
        change_subRiskDesc,
        change_riskOwner,
        change_dateAdded,
        change_regulatedBU,
        change_regulatoryFramework,
        change_PRISM_Categories,
        change_CRD_Categories,
        change_baselCategories,
        change_ICAAP_Categories,
        change_inherentRiskImpact,
        change_inherentRiskLikelihood,
        change_inherentRiskRating,
        change_residualRiskImpact,
        change_residualRiskLikelihood,
        change_residualRiskRating,
        change_groupRiskAppetite,
        change_isBreachingRiskAppetite,
        setRiskRegFormOpen,
        addRowInTable,
        setRow,
        deleteRowInTable,
        row: state.row,
        table: state.table,
        riskRegFormOpen: state.riskRegFormOpen,
    };

}

export default GlobalStateProvider;