import {DateInfo, TimeInfo} from "./generalTypes";

export interface CreateRes {
    sittingId: number,
    reservationId?:number,
    resInfo: ResInfoView,
    tableInfoSet: TableInfoView[]
}

export interface TableInfoView{
    areaStr?: string,
    numberStr?: string
}

export interface ResInfoView{
    sourceStr: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    startTime: TimeInfo,
    durHr: number,
    durMin: number,
    noOfGuests: number,
    notes: string
}

export interface SittingInfoView {
    id?: number,
    categoryStr: string,
    date: DateInfo,
    startTime: TimeInfo,
    endTime: TimeInfo,
    capacity: number
}
