import IRoute from "../interfaces/route";
import Home from "../pages/Home";
import CreateSitting from "../pages/CreateSitting";
import DaySittings from "../pages/DaySittings";
import Sitting from "../pages/Sitting";
import EditSitting from "../pages/EditSitting";
import AddReservation from "../pages/AddReservation";
import EditReservation from "../pages/EditReservation";
import AllResForSitting from "../pages/AllResForSitting";

const routes: IRoute[] = [
    {
        path: "/",
        name: "Home",
        component: Home,
        exact: true
    },
    {
        path: "/createSit",
        name: "Create Sitting",
        component: CreateSitting,
        exact: true
    },
    {
        path: "/editSit",
        name: "Edit Sitting",
        component: EditSitting,
        exact: true
    },
    {
        path: "/daySit",
        name: "Day Sitting",
        component: DaySittings,
        exact: true
    },
    {
        path: "/sit",
        name: "Sitting",
        component: Sitting,
        exact: true
    },
    {
        path: "/addRes",
        name: "Add Reservation",
        component: AddReservation,
        exact: true
    },
    {
        path: "/updateRes",
        name: "UpdateReservation",
        component: EditReservation,
        exact: true
    },
    {
        path: "/allRes",
        name: "AllResForSitting",
        component: AllResForSitting,
        exact: true
    }

]

export default routes;
