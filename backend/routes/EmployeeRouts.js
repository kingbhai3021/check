import express from "express";
import { CreateSubEmployee, CreateDSA } from "../controller/EmployeeController/worker.js";



const employeeRoutuer = express.Router();

employeeRoutuer.post("/Create_sub_employee", CreateSubEmployee);

employeeRoutuer.post("/create_dsa", CreateDSA);

export default employeeRoutuer;