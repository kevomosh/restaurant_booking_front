import {DateInfo, TimeInfo} from "./types/generalTypes";
import {INewSittingState, NewSittingAction} from "../services/SittingReducer";
import {SittingInfoView} from "./types/viewTypes";
import React from "react";
import {ReservationAction} from "../services/ReservationReducer";

export function convertDateTimeStrToDate(dateStr: string, timeStr: string): Date{
    const dateArr = dateStr.split("-")
    const timeArr = timeStr.split(":")
    return  new Date( Number(dateArr[0]), Number(dateStr[1]),
        Number(dateArr[2]) , Number(timeArr[0]), Number(timeArr[1]))
}

export function convertDate(dateString: string): DateInfo {
    const dateArr = dateString.split("-");
    const date: DateInfo = {
        year: parseInt(dateArr[0]),
        month: parseInt(dateArr[1]),
        day: parseInt(dateArr[2])
    }
    return date;
}

export function convertTime(timeString: string): TimeInfo {
    const timeArr = timeString.split(":");
    const time: TimeInfo = {
        hour: parseInt(timeArr[0]),
        minute: parseInt(timeArr[1])
    }
    return time;
}

export function InitializedTime(): Date {
    return new Date(2021, 1, 1);
}


export function convertDateToDateInfo(date: Date): DateInfo {
    return {
        year: date.getFullYear() as number,
        month: date.getMonth() as number + 1,
        day: date.getDate() as number
    }
}

export function createSittingView(state: INewSittingState): SittingInfoView {
    const sittingView: SittingInfoView = {
        categoryStr: state.categoryStr,
        date: convertDate(state.date),
        startTime: convertTime(state.startTime),
        endTime: convertTime(state.endTime),
        capacity: state.capacity
    }
    if (state.variant === 'Create') {
        return sittingView;
    } else {
        return {...sittingView, id: state.id}
    }
}

export function convertTimeResToString(timeStr: string): string {
    const timeArr = timeStr.split(":") as string[];
    return `${timeArr[0]}:${timeArr[1]}`
}

export function convertDateResToString(dateStr: string): string {
    const dateArr = dateStr.split("-") as string[];
    return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
}

export function textFieldHandleOnChange(
    e: React.ChangeEvent<any>,
    fieldName: string,
    dispatch: React.Dispatch<ReservationAction> | React.Dispatch<NewSittingAction>,
): void {
    dispatch({
        type: "field",
        fieldName,
        payload: e.currentTarget.value
    })
}

export function selectFieldHandleOnChange(
    e: React.ChangeEvent<any>,
    fieldName: string,
    dispatch: React.Dispatch<ReservationAction> | React.Dispatch<NewSittingAction>,
): void {
    dispatch({
        type: "field",
        fieldName,
        payload: e.target.value as number | string
    })
}


