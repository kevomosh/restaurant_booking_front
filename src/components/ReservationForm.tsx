import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {IReservationState, ReservationAction} from "../services/ReservationReducer";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container, Divider,
    Grid,
    InputAdornment, InputLabel, MenuItem, Select,
    TextField
} from "@material-ui/core";
import {SourceEnum} from "../utils/enums";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import {AccountCircle, MailOutline, Phone, Notes} from "@material-ui/icons";
import {testTableData} from "../utils/testData";
import ResTable from "./ResTable";
import {selectFieldHandleOnChange, textFieldHandleOnChange} from "../utils/functions";
import {createReservation, editReservation} from "../services/ReservationApi";
import {ResCancelledFreeTables} from "../utils/types/outputTypes";
import {MainContext} from "../App";

interface Props {
    state: IReservationState,
    dispatch: React.Dispatch<ReservationAction>,
    sittingId?: number
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selectField: {
            width: 300,
            marginTop: 5,
            [theme.breakpoints.only('sm')]: {
                width: 200,
            },
        },
    })
)


const ReservationForm: React.FC<Props> = ({state, dispatch, sittingId}) => {
    const [isClickable, setIsClickable] = useState(false);
    const {mainState, mainDispatch} = useContext(MainContext);
    const {freeTables} = mainState

    useEffect(() => {
        if (variant === "Create") {
            setIsClickable(true)
        }

    }, [])


    const {
        sourceStr, firstName, lastName,
        email, phoneNumber, startTime, durHr, tableInfo,
        durMin, noOfGuests, notes, isLoading, variant
    } = state;

    const sourceArr = Object.values(SourceEnum)
    const noOfGuestArr = Array.from({length: 9}, (v, k) => k + 1);
    const textFieldArr = [
        {name: "firstName", field: firstName, label: "First Name", icon: AccountCircle},
        {name: "lastName", field: lastName, label: "Last Name", icon: AccountCircle},
        {name: "email", field: email, label: "Email", icon: MailOutline},
        {name: "phoneNumber", field: phoneNumber, label: "Phone Number", icon: Phone},
    ]
    const selectArr = [
        {name: "sourceStr", field: sourceStr, label: "Source", items: sourceArr},
        {name: "durHr", field: durHr, label: "Hours", items: [0, 1, 2]},
        {name: "durMin", field: durMin, label: "Minutes", items: [0, 15, 30, 45]}
    ]


    const handleDateChange = (date: Date | null) => {
        dispatch({type: 'field', fieldName: "startTime", payload: date})
    }

    async function onSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        let resCancelledFreeTables: ResCancelledFreeTables;
        if (sittingId) {
            try {
                if (variant === "Create") {
                    resCancelledFreeTables = await createReservation(sittingId, startTime, state);
                } else {
                    resCancelledFreeTables = await editReservation(sittingId, startTime, state);
                }
                mainDispatch({type: "ResCancelledFreeTables", resCancelledFreeTables})
            } catch (e) {
                //TODO handle error
            }

        }
    }


    const classes = useStyles();
    return (
        <form noValidate autoComplete="off" onSubmit={e => onSubmit(e)}>
            <Card elevation={4}>
                <CardHeader
                    title={`${variant} Reservation`}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {textFieldArr.map(textField =>
                            <Grid item xs={12} sm={6} md={4} key={textField.name}>
                                <TextField
                                    id={textField.name}
                                    label={textField.label}
                                    value={textField.field}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {<textField.icon/>}
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) =>
                                        textFieldHandleOnChange(e, textField.name, dispatch)
                                    }
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6} md={4}>
                            <InputLabel id="noOfGuests">No of Guests</InputLabel>
                            <Select
                                className={classes.selectField}
                                id="noOfGuests"
                                value={noOfGuests}
                                onChange={(e) =>
                                    selectFieldHandleOnChange(e, "noOfGuests", dispatch)
                                }
                            >
                                {noOfGuestArr.map((item: number) =>
                                    <MenuItem value={item} key={item}>{item}</MenuItem>
                                )}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Start Time"
                                    value={startTime}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        {selectArr.map(sf =>
                            <Grid item xs={12} sm={6} md={4} key={sf.name}>
                                <InputLabel id={sf.name}>{sf.label}</InputLabel>
                                <Select
                                    className={classes.selectField}
                                    id={sf.name}
                                    value={sf.field}
                                    onChange={(e) =>
                                        selectFieldHandleOnChange(e, sf.name, dispatch)
                                    }
                                >
                                    {sf.items.map((item: any) =>
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                id="notes"
                                label="Notes"
                                multiline
                                rowsMax={4}
                                value={notes}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Notes/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) =>
                                    textFieldHandleOnChange(e, "notes", dispatch)
                                }
                            />
                        </Grid>
                    </Grid>
                    <h5>Booked tables</h5>
                    <Grid container spacing={2}>
                        {tableInfo.map(table =>
                            <Grid key={table.number} item>
                                <ResTable tableInfo={table} dispatch={dispatch}/>
                            </Grid>
                        )}
                    </Grid>
                    <Divider/>


                    <h5>Pick Tables</h5>
                    <Grid container spacing={2}>
                        {freeTables.map(table =>
                            <Grid key={table.number} item>
                                <ResTable tableInfo={table} dispatch={dispatch}/>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >{variant}</Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default ReservationForm;
