import React, {useReducer} from 'react';
import { INewSittingState, NewSittingReducer} from "../services/SittingReducer";
import SittingForm from "../components/SittingForm";

const initialState: INewSittingState = {
    categoryStr: '',
    date: "",
    startTime: "",
    endTime: "",
    capacity: 0,
    isLoading: false,
    error: {},
    variant: "Create"
}


const CreateSitting = () => {
    const [state, dispatch] = useReducer(NewSittingReducer, initialState);
    return (
            <SittingForm state={state} dispatch={dispatch} />
    );
};

export default CreateSitting;
