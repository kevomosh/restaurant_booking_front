import axios from "axios";
import {ResCancelledFreeTables} from "../utils/types/outputTypes";
import {CreateRes} from "../utils/types/viewTypes";
import {IReservationState} from "./ReservationReducer";

const reservationUrl = "http://localhost:8080/api/reservation";


export async function getReservationsForSitting
(sittingId: number):Promise<ResCancelledFreeTables>{
    const relUrl = `${reservationUrl}/${sittingId}`;
    const cancelToken = axios.CancelToken.source();
    const res = await axios.get<ResCancelledFreeTables>(relUrl, {
            cancelToken: cancelToken.token,
        })
    return  res.data;
}

export async function editReservation(sittingId: number,startTime: Date, state: IReservationState)
    :Promise<ResCancelledFreeTables>{
    const cancelToken = axios.CancelToken.source();
    const createRes = createResFromResState(sittingId, startTime, state);
    const res = await axios.put<ResCancelledFreeTables>(reservationUrl, createRes, {
        cancelToken: cancelToken.token,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.data
}

export async function createReservation(sittingId: number,startTime: Date, state: IReservationState)
    :Promise<ResCancelledFreeTables> {
    const cancelToken = axios.CancelToken.source();
    const createRes = createResFromResState(sittingId, startTime, state);
    const res = await axios.post<ResCancelledFreeTables>(reservationUrl, createRes, {
        cancelToken: cancelToken.token,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.data;
}

function createResFromResState(sittingId: number,startTime: Date, state: IReservationState):CreateRes {
    const { sourceStr, firstName, lastName, email, phoneNumber, durHr,
        durMin, noOfGuests, notes, tableInfo, reservationId} = state;
    return {
        sittingId,
        reservationId,
        tableInfoSet: tableInfo.map(table => ({
            areaStr: table.area,
            numberStr: table.number
        })),
        resInfo: {
            sourceStr,
            firstName,
            lastName,
            email,
            phoneNumber,
            startTime: {
                hour: startTime.getHours(),
                minute: startTime.getMinutes()
            },
            durHr,
            durMin,
            noOfGuests,
            notes
        }
    }
}


