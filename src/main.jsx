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
import Login from './Components/Pages/Login.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {index: true, Component: Home},
      {path:'/about', Component: AboutUs},
      {path:'/login', Component: Login},
    ]
  },
  {path:'*', Component: NotFound},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
