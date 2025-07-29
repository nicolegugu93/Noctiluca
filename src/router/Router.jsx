import { createBrowserRouter } from "react-router-dom";
import EditButterfly from "../pages/EditButterfly";
import CreateButterfly from "../pages/CreateButterfly";
import Layout from "../layout/Layout";
import LayoutBase from "../layout/LayoutBase";
import Home from "../pages/Home";
import ContactButterfly from "../pages/ContactButterfly";
import ButterflyGallery from "../pages/ButterflyGallery";
import ButterflyMembers from "../pages/ButterflyMembers";
import ButterflyDetail from "../pages/ButterflyDetail";



export const routerButterfly =createBrowserRouter ([{
        path: "/",
        element: <LayoutBase/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
        ],
    },
    
    {
    path:"/",
    element: <Layout/>,
    children: [
    
    { 
        path: "/newbutterfly", 
        element: <CreateButterfly/>
    },
    {
        path: "/editbutterfly/:id",
        element: <EditButterfly/>
    },
     {
        path: "/butterflydetail/:id",
        element: <ButterflyDetail/>
    },
     {
        path: "/contactbutterfly",
        element: <ContactButterfly/>
    },
    {
        path: "/butterflygallery",
        element: <ButterflyGallery/>
    },

    {
        path: "/butterflymembers",
        element: <ButterflyMembers/>
    },

    

    ]
}])


