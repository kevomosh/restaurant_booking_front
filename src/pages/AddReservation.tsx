import React, {useContext, useReducer} from 'react';
import {IReservationState, reservationInitialState, ReservationReducer} from "../services/ReservationReducer";
import ReservationForm from "../components/ReservationForm";
import {Button, Container} from "@material-ui/core";
import {MainContext} from "../App";
import {useHistory} from "react-router-dom";


const AddReservation: React.FC = () => {
    const {mainState} = useContext(MainContext);
    const [state, dispatch] = useReducer(ReservationReducer, reservationInitialState);
    const history = useHistory();
    return (
        <Container>
            {Object.keys(mainState.currentSitting).length > 0
                ? (<ReservationForm state={state} dispatch={dispatch} sittingId={mainState.currentSitting.id}/>
                ) : (
                    <Button
                        onClick={() => history.push("/daySit")}
                        variant="contained"
                        color="secondary">
                        Pick Sitting
                    </Button>)}
        </Container>
    );
};

export default AddReservation;
