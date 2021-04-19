import {TableInfo} from "./generalTypes";
import { ResStatusEnum, SourceEnum} from "../enums";

export interface SittingInfo {
    id?: number,
    category?: string,
    date?: string,
    startTime?: string,
    endTime?: string,
    capacity?: number,
    closed?: boolean
}


export interface ResCancelledFreeTables {
    reservations?: ResInfo[],
    freeTables?: TableInfo[],
    cancelled?: CancelledInfo[]
}


export interface CancelledInfo{
    source?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    startTime?: string
}

export interface ResInfo {
    id?: number,
    source?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    startTime?: string,
    endTime?: string,
    noOfGuests?: number,
    notes?: string,
    actualStartTime?: string,
    actualEndTime?: string,
    status?: string,
    resTables?: TableInfo[]
}

export interface AppError {
    status?: number,
    error?: number,
    message?: string
}
