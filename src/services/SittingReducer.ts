import {AppError, SittingInfo} from "../utils/types/outputTypes";
import {convertDateResToString, convertTimeResToString} from "../utils/functions";


export interface INewSittingState {
    id?: number;
    categoryStr: string;
    date: string;
    startTime: string;
    endTime: string
    capacity: number;
    isLoading: boolean;
    variant: 'Create' | 'Edit';
    error: AppError
}


export type NewSittingAction =
    | { type: 'submit' | 'success'  }
    | {type: "error" ; payload: AppError}
    | { type: 'field'; fieldName: string; payload: string | number }
    | {type: "convertSittingInfoToView"; sittingInfo: SittingInfo}


export function NewSittingReducer
(state: INewSittingState, action: NewSittingAction): INewSittingState {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        case "submit":
            return {
                ...state,
                error: {},
                isLoading: true
            }
        case "success":
            return {
                ...state,
                isLoading: false,
                categoryStr: "",
                date: "",
                startTime: "",
                endTime: "",
                capacity: 0
            }
        case "error":
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                categoryStr: "",
                date: "",
                startTime: "",
                endTime: "",
                capacity: 0
            }
        case "convertSittingInfoToView":
            return convertSittingInfoToView(action.sittingInfo);
        default:
            return state;
    }
}


 function convertSittingInfoToView(sittingInfo: SittingInfo): INewSittingState {
    return {
        id: sittingInfo.id,
        categoryStr: sittingInfo.category as string,
        date: convertDateResToString(sittingInfo.date as string),
        startTime: convertTimeResToString(sittingInfo.startTime as string),
        endTime: convertTimeResToString(sittingInfo.endTime as string),
        capacity: sittingInfo.capacity as number,
        variant: "Edit",
        isLoading: false,
        error: {}
    }
}






