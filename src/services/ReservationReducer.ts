import {AppError, ResInfo} from "../utils/types/outputTypes";
import {TableInfo} from "../utils/types/generalTypes";
import {convertDateTimeStrToDate, InitializedTime} from "../utils/functions";

export interface IReservationState {
    reservationId?: number,
    sourceStr: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    startTime: Date,
    durHr: number,
    durMin: number,
    noOfGuests: number,
    notes: string,
    tableInfo: TableInfo[],
    isLoading: boolean;
    variant: 'Create' | 'Edit';
    error: AppError
}

export const reservationInitialState: IReservationState = {
    sourceStr: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    startTime: InitializedTime(),
    durHr: 0,
    durMin: 0,
    noOfGuests: 1,
    notes: "",
    tableInfo: [],
    isLoading: false,
    variant: "Create",
    error: {}
}

export type ReservationAction =
    | { type: 'submit' | 'success' }
    | { type: "error"; payload: AppError }
    | { type: "initialize"; payload: { sittingDate: string, resInfo: ResInfo } }
    | { type: 'addTable' | 'removeTable'; tableInfo: TableInfo }
    | { type: 'field'; fieldName: string; payload: string | number | Date | null }

export function ReservationReducer
(state: IReservationState, action: ReservationAction): IReservationState {
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
        case "error":
            return {...resetFields(state), isLoading: false, error: action.payload}
        case "success":
            return {...resetFields(state), isLoading: false}
        case "initialize":
            return convertResInfoToResState(action.payload.sittingDate, action.payload.resInfo)
        case "addTable":
            return addTable(state, action.tableInfo)
        case "removeTable":
            return removeTable(state, action.tableInfo)
        default:
            return state;
    }
}

function addTable(state: IReservationState, tableInfo: TableInfo): IReservationState {
    const tableToAdd = {...tableInfo, status: "BOOKED"}
    const alteredTableList = [...state.tableInfo, tableToAdd];
    return {...state, tableInfo: alteredTableList}
}

function removeTable(state: IReservationState, tableInfo: TableInfo): IReservationState {
    const alteredTableList = state.tableInfo.filter(table => table.number !== tableInfo.number);
    return {...state, tableInfo: alteredTableList}
}

function convertResInfoToResState(sittingDate: string, resInfo: ResInfo)
    : IReservationState {
    const {
        id, source, firstName, lastName,
        email, phoneNumber, startTime, endTime,
        noOfGuests, notes, resTables
    } = resInfo;

    const bookedStartTime = convertDateTimeStrToDate(sittingDate, startTime as string)
    const bookedEndTime = convertDateTimeStrToDate(sittingDate, endTime as string);

    const timeDif = bookedEndTime.getTime() - bookedStartTime.getTime();
    const minutes = (timeDif / 1000) / 60;
    const durHr = Math.floor(minutes / 60);
    const durMin = minutes % 60;

    return {
        reservationId: id,
        sourceStr: source as string,
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        phoneNumber: phoneNumber as string,
        startTime: bookedStartTime,
        durHr,
        durMin,
        noOfGuests: noOfGuests as number,
        notes: notes as string,
        tableInfo: resTables as TableInfo[],
        isLoading: false,
        variant: "Edit",
        error: {}
    }
}

function resetFields(state: IReservationState): IReservationState {
    return {
        ...state,
        sourceStr: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        startTime: new Date(),
        durHr: 0,
        durMin: 30,
        noOfGuests: 0,
        notes: "",
    }
}
