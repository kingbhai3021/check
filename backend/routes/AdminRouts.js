import express from 'express';
import { Creditcard, AllInsurance } from '../controller/AdminController/CrmAdmin.js';
import { CreateEmployee, GetAllEmployees, UpdateEmployee, DeleteEmployee } from '../controller/AdminController/Employee.js';
import { AdminAccess } from '../middleware/authMiddleware.js';

const AdminRouter = express.Router();



// CRM All Leds
AdminRouter.get("/AllCreditCardLeads", AdminAccess, Creditcard);

// AdminRouter.get("/AllLoanLeads", AllLoans);

AdminRouter.get("/AllInsurance", AdminAccess, AllInsurance);


// Create Employee
AdminRouter.post("/create_employee", AdminAccess, CreateEmployee);

// Get All Employees
AdminRouter.get("/all", AdminAccess, GetAllEmployees);

// Update Employee
AdminRouter.put("/:id", AdminAccess, UpdateEmployee);

// Delete Employee
AdminRouter.delete("/:id", AdminAccess, DeleteEmployee);

export default AdminRouter;