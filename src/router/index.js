import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main";
import AddProduct from "@/views/AddProduct";
import Product from "@/views/Product";
import EditProduct from "@/views/EditProduct";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Me from "@/views/Me";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/me",
    name: "me",
    component: Me,
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
  },
  {
    path: "/product/create",
    name: "addProduct",
    component: AddProduct,
  },
  {
    path: "/product/:id/edit",
    name: "editProduct",
    component: EditProduct,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
