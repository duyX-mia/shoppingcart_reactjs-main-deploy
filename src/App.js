import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./routes/NotFound";
import TestSignup from "./routes/TestSignup";
import SignUp from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import ListAccount from "./pages/AccountManagement/ListAccount";
import AddAccount from "./pages/AccountManagement/AddAccount";
import EditAccount from "./pages/AccountManagement/EditAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import ListCategory from "./pages/CategoryManagement/ListCategory";
import AddCategory from "./pages/CategoryManagement/AddCategory";
import EditCategory from "./pages/CategoryManagement/EditCategory";
import ListProducts from "./pages/ProductManagement/ListProduct";
import AddProduct from "./pages/ProductManagement/AddProduct";
import EditProduct from "./pages/ProductManagement/EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />

          {/* admin */}
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/admin/account" element={<ListAccount />} />
            <Route path="/admin/account/add" element={<AddAccount />} />
            <Route path="/admin/account/:id/edit" element={<EditAccount />} />

            <Route path="/admin/category" element={<ListCategory />} />
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route path="/admin/category/:id/edit" element={<EditCategory />} />

            <Route path="/admin/product" element={<ListProducts />} />
            <Route path="/admin/product/add" element={<AddProduct />} />
            <Route path="/admin/product/:id/edit" element={<EditProduct />} />
          </Route>

          <Route path="TestSignup" element={<TestSignup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
