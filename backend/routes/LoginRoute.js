import express from 'express';
import {login} from '../controller/LoginController.js';
import {validateToken} from '../controller/LoginController.js';
import {changePassword} from '../controller/PasswordController.js';

const LoginRoute = express.Router();

// All Stage Login was done and here the also we are creating diffrent diffrent JWT
LoginRoute.post("/login",login);

// Validate authentication status
LoginRoute.get("/validate", validateToken);

// Change password
LoginRoute.post("/auth/change-password", changePassword);

export default LoginRoute;