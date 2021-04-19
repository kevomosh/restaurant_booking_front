import React, {useContext, useEffect, useState} from 'react';
import {TableInfo} from "../utils/types/generalTypes";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";
import {TableStatusEnum} from "../utils/enums";
import {MainContext} from "../App";
import {ReservationAction} from "../services/ReservationReducer";

interface Props {
    tableInfo: TableInfo,
    dispatch: React.Dispatch<ReservationAction>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 63,
            height: 58,
            backgroundColor: "red",
            cursor: "pointer"
        },
    })
)

const ResTable: React.FC<Props> = ({tableInfo, dispatch}) => {
    const [backColor, setBackColor] = useState("grey");
    const {mainDispatch, mainState} = useContext(MainContext);
    const classes = useStyles();
    const {number} = tableInfo;

    useEffect(() => {
        switch (tableInfo.status as TableStatusEnum) {
            case TableStatusEnum.AVAILABLE:
                setBackColor("green");
                break;
            default :
                setBackColor("red");
        }
    }, [])

    function handleClick() {
            switch (tableInfo.status as TableStatusEnum) {
                case TableStatusEnum.AVAILABLE:
                    handleAvailable();
                    break;
                default:
                    handleBooked()
            }
    }

    function handleAvailable() {
        setBackColor("red");
        mainDispatch({type: "removeFreeTable", tableInfo})
        dispatch({type: "addTable", tableInfo})
    }

    function handleBooked() {
        setBackColor("green");
        mainDispatch({type: "addFreeTable", tableInfo})
        dispatch({type: "removeTable", tableInfo})
    }

    return (
        <Box
            style={{backgroundColor: backColor}}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.root}
            onClick={() => handleClick()}>
            {number}
        </Box>
    );
};

export default ResTable;
