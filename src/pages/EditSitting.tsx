import React, {useContext, useEffect, useReducer} from 'react';
import {INewSittingState, NewSittingReducer} from "../services/SittingReducer";
import SittingForm from "../components/SittingForm";
import {MainContext} from "../App";
import {SittingInfo} from "../utils/types/outputTypes";
import {getSittingById} from "../services/SittingApi";

const initialState: INewSittingState = {
    categoryStr: '',
    date: "",
    startTime: "",
    endTime: "",
    capacity: 0,
    isLoading: false,
    error: {},
    variant: "Edit"
}

const EditSitting: React.FC = () => {
    const [state, dispatch] = useReducer(NewSittingReducer, initialState);
    const {mainState, mainDispatch} = useContext(MainContext);

    useEffect(() => {
        async function getSittingInfo(sittingId: number): Promise<SittingInfo> {
            return await getSittingById(sittingId)
        }

        const id = mainState.currentSitting.id
        if (id) {
            dispatch({type: 'submit'})
            getSittingInfo(id)
                .then(currentSitting => {
                    dispatch({type: 'success'})
                    dispatch({type: "convertSittingInfoToView", sittingInfo: currentSitting})
                    mainDispatch({type: "CurrentSitting", sitting: currentSitting})
                }).catch(error => {
                dispatch({type: "error", payload: error.response.data})
            })
        }
    }, [mainState.currentSitting.id])

    return (
        <SittingForm state={state} dispatch={dispatch} />
    );
};

export default EditSitting;
