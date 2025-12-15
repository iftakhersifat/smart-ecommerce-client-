import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Components/Root/Root.jsx';
import Home from './Components/Pages/Home.jsx';
import NotFound from './Components/Pages/NotFound.jsx';
import AboutUs from './Components/Pages/AboutUs.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {index: true, Component: Home},
      {path:'/about', Component: AboutUs},
    ]
  },
  {path:'*', Component: NotFound},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
