import React, {useReducer} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import routes from "./config/routes";
import {MainReducer, IMainState, Action} from "./services/MainReducer";
import Header from "./components/Header";

const InitState: IMainState = {
    daySittings: [],
    currentSitting: {},
    currentReservation: {},
    allResForSitting: [],
    cancelled :[],
    freeTables: [],
    isLoading: false,
    error: {}
}

interface ContextType {
    mainState: IMainState,
    mainDispatch: React.Dispatch<Action>
}

export const MainContext = React.createContext({} as ContextType);

function App() {
    const [mainState, mainDispatch] = useReducer(MainReducer, InitState)
    return (
        <MainContext.Provider value={{mainState , mainDispatch}}>
            <BrowserRouter>
                <Header />
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                             />
                        )
                    })}
                </Switch>
            </BrowserRouter>
        </MainContext.Provider>
    );
}

export default App;
