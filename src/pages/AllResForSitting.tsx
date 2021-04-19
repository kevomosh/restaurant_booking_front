import React, {useContext, useEffect} from 'react';
import {Container} from "@material-ui/core";
import {MainContext} from "../App";
import {ResCancelledFreeTables} from "../utils/types/outputTypes";
import {getReservationsForSitting} from "../services/ReservationApi";
import ResInList from "../components/ResInList";

const AllResForSitting: React.FC = () => {
    const {mainDispatch, mainState} = useContext(MainContext);
    const {currentSitting, allResForSitting} = mainState

    useEffect(() => {
        async function getAllResForSitting(): Promise<ResCancelledFreeTables> {
            return await getReservationsForSitting(currentSitting.id as number)
        }

        if (currentSitting.id) {
            getAllResForSitting()
                .then(resCancelledFreeTables => {
                    mainDispatch({type: "ResCancelledFreeTables", resCancelledFreeTables})
                }).catch(error => {
                //TODO CHECK ERROR
                //mainDispatch({type: "UpdateError", payload: error.response.data})
            })
        }

    }, [currentSitting.id])
    return (
        <Container>
            {allResForSitting.length > 0 ? (
                allResForSitting.map(reservation => <ResInList key={reservation.id}  reservation={reservation}/>)
            ): (<h2>no results </h2>)}

        </Container>
    );
}
;

export default AllResForSitting;
