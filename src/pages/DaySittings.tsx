import React, {useContext} from 'react';
import {Button, Card, CardContent, Container, Divider} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {MainContext} from "../App";
import {getSittingsForDay} from "../services/SittingApi";
import SittingInList from "../components/SittingInList";

const DaySittings: React.FC = () => {
    const {mainState, mainDispatch} = useContext(MainContext);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date(),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    async function handleOnSubmit(): Promise<void> {
        await getSittingsForDay(selectedDate as Date, mainDispatch);
    }

    return (
        <Container>
            <Card>
                <Grid container justify="space-around">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button color="primary" variant="contained" type="button"
                            onClick={() => handleOnSubmit()}>Submit</Button>
                </Grid>
                <Divider/>
                <CardContent>
                    {(mainState.daySittings.length > 0 ? (mainState.daySittings.map(sitting =>
                         <SittingInList key={sitting.id} sitting={sitting}/>
                    )) : (<h2>NOne or pick another date</h2>))}

                </CardContent>
            </Card>
        </Container>
    );
};

export default DaySittings;
