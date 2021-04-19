import React, {useContext} from 'react';
import { INewSittingState, NewSittingAction} from "../services/SittingReducer";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
    Card, Button, Select, MenuItem,
    Grid, CardActions, CardContent,
    TextField, CardHeader, Container,
    InputLabel
} from "@material-ui/core";
import {CategoryEnum} from "../utils/enums";
import {MainContext} from "../App";
import {createOrEditSitting} from "../services/SittingApi";


const categories = Object.values(CategoryEnum);
const capacityArr = [0, 20, 30, 40, 50]

interface Props {
    state: INewSittingState,
    dispatch: React.Dispatch<NewSittingAction>
}

const SittingForm: React.FC<Props> = ({state, dispatch}) => {
    const {categoryStr, capacity, isLoading, date, startTime, endTime, variant} = state;
    const {mainDispatch} = useContext(MainContext);
    const classes = useStyles();

    async function onSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        await createOrEditSitting(state, dispatch, mainDispatch);
    }


    return (
        <Container>
            <form noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>
                <Card className={classes.main}>
                    <CardHeader title={`${variant} sitting`}/>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    value={date}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: "date",
                                            payload: e.currentTarget.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="startTime"
                                    label="Start clock"
                                    type="time"
                                    value={startTime}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}


                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: "startTime",
                                            payload: e.currentTarget.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="endTime"
                                    label="Alarm clock"
                                    type="time"
                                    value={endTime}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: "endTime",
                                            payload: e.currentTarget.value
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    className={classes.selectField}
                                    id="category"
                                    value={categoryStr}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: "categoryStr",
                                            payload: e.target.value as string
                                        })
                                    }
                                >
                                    {categories.map(item => {
                                        return <MenuItem value={item} key={item}>{item}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="capacity">Capacity</InputLabel>
                                <Select
                                    className={classes.selectField}
                                    id="capacity"
                                    value={capacity}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: "capacity",
                                            payload: e.target.value as number
                                        })
                                    }
                                >
                                    {capacityArr.map(cap => {
                                        return <MenuItem value={cap} key={cap}>{cap}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            className={classes.btn}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >{variant}</Button>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            // width: 600,
            margin: "20px auto"
        },
        man: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        selectField: {
            width: 400,
            marginTop: 5,
            [theme.breakpoints.only('sm')]: {
                width: 200,
            },
        },
        textField: {
            width: 200,
            [theme.breakpoints.only('xs')]: {
                width: 400,
            },
        },
        category: {
            marginTop: 10
        },
        btn: {
            margin: "auto"
        }
    }))

export default SittingForm;
