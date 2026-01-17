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
import EmployeePrivate from './Components/Firebase/EmployeePrivate.jsx';
import Register from './Components/Pages/Register.jsx';
import ProductDetails from './Components/Products/ProductDetails.jsx';
import ProductsGrid from './Components/Products/ProductsGrid.jsx';
import CheckoutPage from './Components/Products/CheckoutPage.jsx';

import Private from './Components/Firebase/Private.jsx';
import AdminPrivate from './Components/Firebase/AdminPrivate.jsx';
import OrderConfirmation from './Components/Products/OrderConfirmation.jsx';


import ManageUsers from './Components/Dashboard/ManageUsers.jsx';
import AdminLayout from './Components/Dashboard/AdminLayout.jsx';
import ManageOrders from './Components/Dashboard/ManageOrders.jsx';
import ManageProducts from './Components/Dashboard/ManageProducts.jsx';
import AddProduct from './Components/Dashboard/AddProduct.jsx';
import MyOrders from './Components/Products/MyOrders.jsx';
import EmployeeLayout from './Components/EmployeeDashboard/EmployeeLayout.jsx';
import EmployeeManageProducts from './Components/EmployeeDashboard/EmployeeManageProducts.jsx';
import Wishlist from './Components/Products/Wishlist.jsx';
import Compare from './Components/Products/Compare.jsx';
import ProfileUpdate from './Components/Dashboard/ProfileUpdate.jsx';

import ContactSection from './Components/Pages/ContactSection.jsx';
import AdminMessages from './Components/Dashboard/AdminMessages.jsx';
import TopBrands from './Components/Pages/TopBrands.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {index: true, Component: Home},
      {path:'/about', Component: AboutUs},
      {path:'/login', Component: Login},
      {path:'/register', Component: Register},
      {path:'/products-list', Component: ProductsGrid},
      {path:'/products/:id', Component: ProductDetails},
      {path:'/checkout/:id', element: <Private><CheckoutPage /></Private>},
      {path:'/order-confirmation', element: <Private><OrderConfirmation /></Private>},
      {path:'/wishlist', element: <Private><Wishlist /></Private>},
      {path:'/compare', element: <Private><Compare /></Private>},
      {path: "/order-list", element: <MyOrders />},
      {path: "/profile", element: <ProfileUpdate />},
      {path: "/contact", element: <ContactSection />},

      {path: "/brands", element: <TopBrands />},
    ]
  },

  {
    path: "/employee",
    element: <EmployeePrivate><EmployeeLayout /></EmployeePrivate>,
    children:[
      {path: "manage-products", element: <ManageProducts />},
      {path: "add-product", element: <AddProduct />},
      {path: "manage-orders", element: <ManageOrders />},
    ]
  },

  {
    path: "/admin",
    element: <AdminPrivate><AdminLayout /></AdminPrivate>,
    children: [
      {path: "manage-products", element: <ManageProducts />},
      {path: "add-product", element: <AddProduct />},
      {path: "manage-orders", element: <ManageOrders />},
      {path: "manage-users", element: <ManageUsers />},
      {path: "messages", element: <AdminMessages />}
    ],
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
