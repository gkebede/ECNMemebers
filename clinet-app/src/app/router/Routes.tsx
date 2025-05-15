import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import About from "../../../component/About";
import Contact from "../../../component/Contact";
import MemberDashboard from "../../features/members/dashboard/MemberDashboard";
import Home from "../../../component/Home";
import DetailDisplay from "../../features/members/dashboard/DetailDisplay";
//import ObservedMemberForm from "../../features/members/form/MemberForm";
import { MemberFormWrapper } from "../../features/members/form/MemberFormWrapper";
 


const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
             { path: '/home', element: <Home /> },
            { path: 'memberList', element: <MemberDashboard /> },
            { path: 'acconut', element: <About /> },
            { path: 'contact', element: <Contact /> },
            { path: 'card/:id', element: <DetailDisplay /> },
            { path: 'edit/:id', element: <MemberFormWrapper /> },
            { path: 'create', element: <MemberFormWrapper /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
];

export const router = createBrowserRouter(routes); 


//*** */ MemberCard    -- details view
// MemberForm    -- create and edit form
// MemberList    -- list of members
// MemberDashboard -- dashboard view with list of members and create/edit form
// FormDisplaySection -- form display section with create/edit form
// DetailDisplay -- detail view of a single member
// App -- main app layout with routing
// Home -- home page
// About -- about page  
// Contact -- contact page
