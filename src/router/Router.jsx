import { createBrowserRouter } from "react-router-dom";
import EditButterfly from "../pages/EditButterfly";
import CreateButterfly from "../pages/CreateButterfly";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ContactButterfly from "../pages/ContactButterfly";
import ButterflyGallery from "../pages/ButterflyGallery";
import ButterflyMembers from "../pages/ButterflyMembers";
import ButterflyDetail from "../pages/ButterflyDetail";
import MapPreview from "../pages/MapPreview";


export const routerButterfly =createBrowserRouter ([{
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
    {
        path: "/butterflygallery",
        element: <ButterflyGallery/>
    },

    {
        path: "/butterflymembers",
        element: <ButterflyMembers/>
    },

    {
        path: "/mappreview",
        element: <MapPreview/>
    },

    ]
}])


