
export const TYPE = {
    change_business_unit_name: "change_business_unit_name",
    change_business_unit_type: "change_business_unit_type",
    change_subRiskID: "change_subRiskID",
    change_riskPillar: "change_riskPillar",
    change_riskCategory: "change_riskCategory",
    change_riskCategoryDesc: "change_riskCategoryDesc",
    change_subRiskName: "change_subRiskName",
    change_subRiskDesc: "change_subRiskDesc",
    change_riskOwner: "change_riskOwner",
    change_dateAdded: "change_dateAdded",
    change_regulatedBU: "change_regulatedBU",
    change_regulatoryFramework: "change_regulatoryFramework",
    change_PRISM_Categories: "change_PRISM_Categories",
    change_CRD_Categories: "change_CRD_Categories",
    change_baselCategories: "change_baselCategories",
    change_ICAAP_Categories: "change_ICAAP_Categories",
    change_inherentRiskImpact: "change_inherentRiskImpact",
    change_inherentRiskLikelihood: "change_inherentRiskLikelihood",
    change_inherentRiskRating: "change_inherentRiskRating",
    change_residualRiskImpact: "change_residualRiskImpact",
    change_residualRiskLikelihood: "change_residualRiskLikelihood",
    change_residualRiskRating: "change_residualRiskRating",
    change_groupRiskAppetite: "change_groupRiskAppetite",
    change_isBreachingRiskAppetite: "change_isBreachingRiskAppetite",
    clearRow: "clearRow",
    setRiskRegFormOpen: "setRiskRegFormOpen",
    deleteRow: "deleteRow",
    addRow: "addRow",
    setRow: "setRow",
};

const RiskMatrixReducer = (state, action) => {
    const {type, payload} = action;
    const rowdata = state.row;
    const table = state.table;
    switch (type) {
        case TYPE.setRiskRegFormOpen:
            return {
                ...state,
                riskRegFormOpen: payload
            }
        case TYPE.setRow:
            return {
                ...state,
                row: { ...payload }
            }
        case TYPE.addRow:
            table.push(payload);
            return {
                ...state,
                table: table
            }
        case TYPE.deleteRow:
            const newTable = table.filter(item => item.subRiskID !== payload.subRiskID)

            return {
                ...state,
                row: {...payload},
                table: newTable
            }
        case TYPE.clearRow:
            return {
                ...state,
                row: {
                    ...payload
                }
            }
        case TYPE.change_business_unit_name:
            return {
                ...state,
                row: {
                    ...rowdata,
                    business_unit_name: payload,
                }
            };
        case TYPE.change_business_unit_type:
            return {
                ...state,
                row: {
                    ...rowdata,
                    business_unit_type: payload,
                }
            };
        case TYPE.change_subRiskID:
            return {
                ...state,
                row: {
                    ...rowdata,
                    subRiskID: payload,
                }
            };
        case TYPE.change_riskPillar:
            return {
                ...state,
                row: {
                    ...rowdata,
                    riskPillar: payload,
                }
            };
        case TYPE.change_riskCategory:
            return {
                ...state,
                row: {
                    ...rowdata,
                    riskCategory: payload,
                }
            };
        case TYPE.change_riskCategoryDesc:
            return {
                ...state,
                row: {
                    ...rowdata,
                    riskCategoryDesc: payload,
                }
            };
        case TYPE.change_subRiskName:
            return {
                ...state,
                row: {
                    ...rowdata,
                    subRiskName: payload,
                }
            };
        case TYPE.change_subRiskDesc:
            return {
                ...state,
                row: {
                    ...rowdata,
                    subRiskDesc: payload,
                }
            };
        case TYPE.change_riskOwner:
            return {
                ...state,
                row: {
                    ...rowdata,
                    riskOwner: payload,
                }
            };
        case TYPE.change_dateAdded:
            return {
                ...state,
                row: {
                    ...rowdata,
                    dateAdded: payload,
                }
            };
        case TYPE.change_regulatedBU:
            return {
                ...state,
                row: {
                    ...rowdata,
                    regulatedBU: payload,
                }
            };
        case TYPE.change_regulatoryFramework:
            return {
                ...state,
                row: {
                    ...rowdata,
                    regulatoryFramework: payload,
                }
            };
        case TYPE.change_PRISM_Categories:
            return {
                ...state,
                row: {
                    ...rowdata,
                    PRISM_Categories: payload,
                }
            };
        case TYPE.change_CRD_Categories:
            return {
                ...state,
                row: {
                    ...rowdata,
                    CRD_Categories: payload,
                }
            };
        case TYPE.change_baselCategories:
            return {
                ...state,
                row: {
                    ...rowdata,
                    baselCategories: payload,
                }
            };
        case TYPE.change_ICAAP_Categories:
            return {
                ...state,
                row: {
                    ...rowdata,
                    ICAAP_Categories: payload,
                }
            };
        case TYPE.change_inherentRiskImpact:
            return {
                ...state,
                row: {
                    ...rowdata,
                    inherentRiskImpact: payload,
                }
            };
        case TYPE.change_inherentRiskLikelihood:
            return {
                ...state,
                row: {
                    ...rowdata,
                    inherentRiskLikelihood: payload,
                }
            };
        case TYPE.change_inherentRiskRating:
            return {
                ...state,
                row: {
                    ...rowdata,
                    inherentRiskRating: payload,
                }
            };
        case TYPE.change_residualRiskImpact:
            return {
                ...state,
                row: {
                    ...rowdata,
                    residualRiskImpact: payload,
                }
            };
        case TYPE.change_residualRiskLikelihood:
            return {
                ...state,
                row: {
                    ...rowdata,
                    residualRiskLikelihood: payload,
                }
            };
        case TYPE.change_residualRiskRating:
            return {
                ...state,
                row: {
                    ...rowdata,
                    residualRiskRating: payload,
                }
            };
        case TYPE.change_groupRiskAppetite:
            return {
                ...state,
                row: {
                    ...rowdata,
                    groupRiskAppetite: payload,
                }
            };
        case TYPE.change_isBreachingRiskAppetite:
            return {
                ...state,
                row: {
                    ...rowdata,
                    isBreachingRiskAppetite: payload,
                }
            };
        default:
            return state;
    }

};

export default RiskMatrixReducer;