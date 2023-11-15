import express from "express";
import authenticateMiddleware from "../middleware/auth.js";

import {
  getCustomer,
  getCustomerDetail,
  createCustomer,
} from "../controller/customer.js";

const customerRouter = express.Router();

customerRouter.use(express.urlencoded({ extended: true }));
customerRouter.get("/getcustumer", authenticateMiddleware, getCustomer);
customerRouter.post("/getcustomerdetail", getCustomerDetail);
customerRouter.post("/create-customer", createCustomer);

export default customerRouter;
