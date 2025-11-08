import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import AllProducts from "../Components/AllProducts";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import MyProducts from "../Pages/MySelf/MyProducts";
import MyBids from "../Pages/MySelf/MyBids";
import PrivateRouter from "./PrivateRouter";
import ProductDetails from "../Components/ProductDetails";
import CreateAProduct from "../Components/CreateAProduct";
import Home from "../Pages/Home/Home";
// import { api } from "../Hooks/useApi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allproducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/myproducts",
        element: (
          <PrivateRouter>
            <MyProducts></MyProducts>
          </PrivateRouter>
        ),
      },
      {
        path: "/mybids",
        element: (
          <PrivateRouter>
            <MyBids></MyBids>
          </PrivateRouter>
        ),
      },
      {
        path: "/createproduct",
        element: (
          <PrivateRouter>
            <CreateAProduct></CreateAProduct>
          </PrivateRouter>
        ),
      },
      {
        path: "/allproducts/:id",
        element: (
          <PrivateRouter>
            {" "}
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
export default router;
