import Register from "./views/examples/Register";
import Login from "./views/examples/Login";
import Tables from "./views/examples/Tables";
import Icons from "./views/examples/Icons";
import Profile from "./views/examples/Profile";
import Maps from "./views/examples/Maps";
import Index from "./views/Index";

const routes = [
    {
        path      : "/index",
        name      : "Dashboard",
        icon      : "ni ni-tv-2 text-primary",
        component : Index,
        layout    : "/admin",
    },
    {
        path      : "/icons",
        name      : "Icons",
        icon      : "ni ni-planet text-blue",
        component : Icons,
        layout    : "/admin",
    },
    {
        path      : "/maps",
        name      : "Maps",
        icon      : "ni ni-pin-3 text-orange",
        component : Maps,
        layout    : "/admin",
    },
    {
        path      : "/user-profile",
        name      : "User Profile",
        icon      : "ni ni-single-02 text-yellow",
        component : Profile,
        layout    : "/admin",
    },
    {
        path      : "/tables",
        name      : "Tables",
        icon      : "ni ni-bullet-list-67 text-red",
        component : Tables,
        layout    : "/admin",
    },
    {
        path      : "/login",
        name      : "Login",
        icon      : "ni ni-key-25 text-info",
        component : Login,
        layout    : "/auth",
    },
    {
        path      : "/register",
        name      : "Register",
        icon      : "ni ni-circle-08 text-pink",
        component : Register,
        layout    : "/auth",
    },
];

export default routes;
