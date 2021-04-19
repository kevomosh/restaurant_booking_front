import React, {useContext, useEffect, useReducer} from 'react';
import {MainContext} from "../App";
import {IReservationState, reservationInitialState, ReservationReducer} from "../services/ReservationReducer";
import {useHistory} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
import ReservationForm from "../components/ReservationForm";

const initialState : IReservationState = {
    ...reservationInitialState,
    variant: "Edit"
}

const EditReservation: React.FC = () => {
    const {mainState} = useContext(MainContext);
    const [state, dispatch] = useReducer(ReservationReducer, initialState);
    const {currentReservation, currentSitting} = mainState;
    const history = useHistory();

    useEffect(() => {
        if (Object.keys(currentReservation).length > 0) {
            const payloadInfo = {
                sittingDate: currentSitting.date as string,
                resInfo: currentReservation
            }
            dispatch({type: "initialize", payload: payloadInfo })
        }
    },[currentReservation])

    return (
        <Container>
            {Object.keys(mainState.currentSitting).length > 0
                ? (<ReservationForm state={state} dispatch={dispatch} sittingId={mainState.currentSitting.id}/>
                ) : (
                    <Button
                        onClick={() => history.push("/daySit")}
                        variant="contained"
                        color="secondary">
                        Pick Sitting from update
                    </Button>)}
        </Container>
    );
};

export default EditReservation;
