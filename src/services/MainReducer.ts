import {
    AppError,
    CancelledInfo, ResCancelledFreeTables,
    ResInfo,
    SittingInfo,
} from "../utils/types/outputTypes";
import {TableInfo} from "../utils/types/generalTypes";
import {TableStatusEnum} from "../utils/enums";

export type Action =
    | { type: "CurrentSitting"; sitting: SittingInfo }
    | {
    type: "updateDaySittings";
    allSittings: SittingInfo[];
}
    | {type: "DeleteSitting"; sittingId: number}
    | {type: "addFreeTable" | "removeFreeTable";  tableInfo: TableInfo}
    | { type: "CurrentReservation"; reservation: ResInfo }
    | { type: "ResCancelledFreeTables"; resCancelledFreeTables: ResCancelledFreeTables}
    | {type: "UpdateLoading"; isLoading: boolean}
    | {type: "UpdateError"; error: AppError}
    | { type: "FreeTables"; freeTables: TableInfo[] };

export interface IMainState {
    daySittings: SittingInfo[];
    currentSitting: SittingInfo;
    currentReservation: ResInfo;
    allResForSitting: ResInfo[];
    cancelled: CancelledInfo[];
    freeTables: TableInfo[];
    error: AppError;
    isLoading: boolean
}

export function MainReducer(state: IMainState, action: Action): IMainState {
    switch (action.type) {
        case "UpdateLoading":
            return {...state, isLoading: action.isLoading};
        case "updateDaySittings":
            return {...state, daySittings: action.allSittings};
        case "CurrentSitting":
            return {...state, currentSitting: action.sitting};
        case "CurrentReservation":
            return {...state, currentReservation: action.reservation};
        case "ResCancelledFreeTables":
            return resCancelledFreeTables(state, action.resCancelledFreeTables)
        case "FreeTables":
            return {...state, freeTables: action.freeTables};
        case "DeleteSitting":
            return deleteSitting(state, action.sittingId);
        case "addFreeTable":
            return addFreeTable(state, action.tableInfo);
        case "removeFreeTable":
            return removeFreeTable(state, action.tableInfo);
        case "UpdateError":
            return {...state, error: action.error}
        default:
            return state;
    }
}

function resCancelledFreeTables
(state: IMainState, resCancelledFreeTables: ResCancelledFreeTables): IMainState {
    return {
        ...state,
        allResForSitting: resCancelledFreeTables.reservations as ResInfo[],
        cancelled: resCancelledFreeTables.cancelled as CancelledInfo[],
        freeTables: resCancelledFreeTables.freeTables as TableInfo[]
    }
}


function deleteSitting(state: IMainState, sittingId: number): IMainState {
    const daySittings = [...state.daySittings].filter(sitting => sitting.id !== sittingId);
    return {
        ...state,
        daySittings,
    }
}

function addFreeTable(state: IMainState, tableInfo: TableInfo): IMainState {
    const tableToAdd = {...tableInfo, status: TableStatusEnum.AVAILABLE as string};
    const updatedFreeTables = [...state.freeTables, tableToAdd];
    return {...state, freeTables: updatedFreeTables}
}

function removeFreeTable(state: IMainState, tableInfo: TableInfo): IMainState {
    const updatedFreeTables = state.freeTables.filter(table => table.number !== tableInfo.number);
    return {...state, freeTables: updatedFreeTables}
}





