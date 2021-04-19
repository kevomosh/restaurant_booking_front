import React from "react";
import axios, {AxiosResponse, CancelTokenSource} from "axios";
import {SittingInfo} from "../utils/types/outputTypes";
import {Action} from "./MainReducer";
import {convertDateToDateInfo, createSittingView} from "../utils/functions";
import {INewSittingState, NewSittingAction} from "./SittingReducer";
import {SittingInfoView} from "../utils/types/viewTypes";

const sittingUrl = "http://localhost:8080/api/sitting";


export async function getSittingsForDay(selectedDate: Date, mainDispatch: React.Dispatch<Action>)
    : Promise<void> {
    const dateInfo = convertDateToDateInfo(selectedDate);
    try {
        mainDispatch({type: "UpdateLoading", isLoading: true})
        mainDispatch({type: "UpdateError", error: {}})
        const relUrl = `${sittingUrl}/day`;
        const cancelToken = axios.CancelToken.source();
        const res = await axios.post<SittingInfo[]>(relUrl, dateInfo, {
            cancelToken: cancelToken.token,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const allSittings = res.data;
        mainDispatch({type: "UpdateLoading", isLoading: false})
        mainDispatch({type: "updateDaySittings", allSittings})

    } catch (e) {
        if (axios.isCancel(e)) return
        mainDispatch({type: "UpdateLoading", isLoading: false})
        const error = e.response.data
        mainDispatch({type:"UpdateError", error})
    }
}

export async function getSittingById(sittingId: number): Promise<SittingInfo> {
    const relUrl = `${sittingUrl}/${sittingId}`;
    const cancelToken = axios.CancelToken.source();
    const res = await axios.get<SittingInfo>(relUrl, {
        cancelToken: cancelToken.token,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.data
}

export async function deleteSittingById(sittingId: number, mainDispatch: React.Dispatch<Action>):Promise<void> {
    const relUrl = `${sittingUrl}/${sittingId}`;
    try {
        await axios.delete<string>(relUrl)
        mainDispatch({type: "DeleteSitting", sittingId})
    } catch (e) {
        const error = e.response.data
        mainDispatch({type:"UpdateError", error})
    }
}

export async function createOrEditSitting(
    state: INewSittingState,
    dispatch: React.Dispatch<NewSittingAction>, mainDispatch: React.Dispatch<Action>): Promise<void> {

    dispatch({type: 'submit'})
    const sittingView = createSittingView(state)
    let sitting: SittingInfo
    try {
        const cancelToken = axios.CancelToken.source();
        if (state.variant === "Edit") {
            sitting = await editSitting(cancelToken, sittingView)
        } else {
            sitting = await createSitting(cancelToken, sittingView)
        }
        dispatch({type: 'success'})
        mainDispatch({type: "CurrentSitting", sitting})
    } catch (e) {
        if (axios.isCancel(e)) return
        dispatch({type: "error", payload: e.response.data})
        console.log(e.response.data);
    }
}

 async function createSitting(cancelToken: CancelTokenSource ,sittingView: SittingInfoView)
    : Promise<SittingInfo> {
    const res = await axios.post<SittingInfo>(sittingUrl, sittingView, {
        cancelToken: cancelToken.token,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.data
}

 async function editSitting(cancelToken: CancelTokenSource ,sittingView: SittingInfoView)
    : Promise<SittingInfo> {
    const res = await axios.put<SittingInfo>(sittingUrl, sittingView, {
        cancelToken: cancelToken.token,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.data
}


