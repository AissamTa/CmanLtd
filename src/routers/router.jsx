import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Services from "../components/Services.jsx";
import Contact from "../components/Contact.jsx";
import Installation from "../components/services/Installation.jsx"; // A generic component to handle all services

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
        // It's often better to render child routes at the top level
        // if they should also be rendered within the main layout.
        // Or, if Services.jsx has its own <Outlet />, this is correct.
      },
      {
        // This is the dynamic route for individual services.
        path: "/services/:id",
        element: <Installation />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
