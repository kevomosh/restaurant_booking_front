import React, {useContext} from 'react';
import {ResInfo} from "../utils/types/outputTypes";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {MainContext} from "../App";

interface Props {
    reservation: ResInfo
}

const ResInList:React.FC<Props> = ({reservation}) => {
    const history = useHistory();
    const {mainDispatch} = useContext(MainContext);

    function handleOnEdit(){
        mainDispatch({type: "CurrentReservation", reservation})
        history.push("/updateRes")
    }

    return (
        <Card>
            <CardContent>
                <h4>{`${reservation.firstName} ${reservation.lastName}`}</h4>
                <h5>{reservation.startTime}</h5>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => handleOnEdit()}
                    variant="contained"
                    color="secondary">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
};

export default ResInList;
