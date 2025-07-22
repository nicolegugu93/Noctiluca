import { createBrowserRouter } from "react-router-dom";
import EditButterfly from "../pages/EditButterfly";
import CreateButterfly from "../pages/CreateButterfly";
import ButterflyDetail from "../pages/ButterflyDetail";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ContactButterfly from "../pages/ContactButterfly";


const routerButterfly =createBrowserRouter ([{
    path:"/",
    element: <Layout/>,
    children: [
        {
            index: true, 
        element: <Home/>,
    },
    { 
        path: "/newbutterly", 
        element: <CreateButterfly/>
    },
    {
        path: "/editbutterfly:id",
        element: <EditButterfly/>
    },
     {
        path: "/butterflydetail:id",
        element: <ButterflyDetail/>
    },
     {
        path: "/contactbutterfly",
        element: <ContactButterfly/>
    },

    ]
}])
export default routehrButterfly;

