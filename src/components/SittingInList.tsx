import React, {useContext} from 'react';
import {SittingInfo} from "../utils/types/outputTypes";
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActions, CardContent, CardHeader, Grid} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from "@material-ui/core";
import {MainContext} from "../App";
import {deleteSittingById} from "../services/SittingApi";
import {useHistory} from 'react-router-dom';


interface Props {
    sitting: SittingInfo
}

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        padding: 10,
        border: "black"
    },
    button: {
        margin: theme.spacing(1),
    },
}))


const SittingInList: React.FC<Props> = ({sitting}) => {
    const {mainDispatch} = useContext(MainContext);
    const history = useHistory();
    const classes = useStyles();

    const btnList = [
        {name: "Edit", icon: EditIcon, clickHandler: divert, route: "editSit"},
        {name: "Add Res", icon: MoreVertIcon, clickHandler: divert, route: "addRes"},
        {name: "All Res", icon: MoreVertIcon, clickHandler: divert, route: "allRes"}

    ]

    async function deleteSitting() {
        await deleteSittingById(sitting.id as number, mainDispatch);
    }

    function divert(route: string): void {
        mainDispatch({type: "CurrentSitting", sitting});
        history.push(`/${route}`)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title={sitting.category}
                subheader={`${sitting.startTime} to ${sitting.endTime}`}
            >
            </CardHeader>
            <CardActions disableSpacing>
                {btnList.map(btn =>
                    <Button
                        key={btn.name}
                        onClick={() => btn.clickHandler(btn.route)}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<btn.icon/>}
                    >
                        {btn.name}
                    </Button>
                )}
                <Button
                    onClick={() => deleteSitting()}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DeleteIcon/>}
                >
                    Delete
                </Button>

            </CardActions>
        </Card>
    );
};

export default SittingInList;
