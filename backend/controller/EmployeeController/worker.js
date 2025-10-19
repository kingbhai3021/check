import ChildrenModel from "../../model/children.js";
import UserModel from "../../model/usermodel.js";
import { GenReferance, CreatePassword, wittywealth } from "../signupcontroller.js";
import { getIdFromEmployee } from "../../utils/auth.js";

// Create a SUB_Employee 
export const CreateSubEmployee = async (req, res) => {
    const id = getIdFromEmployee();
    if (!id) {
        return res.status(401).json({ message: "Unauthorized", user: null });
    }
    try {
        const { phone } = req.body;

        // Check if phone already exists
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return res.status(409).json({ message: "Phone already registered", user: { username: existingUser?.wittywealth, password: existingUser?.password } });
        }

        // Generate reference ID and password
        const refId = GenReferance();
        const randomPass = CreatePassword();

        // Create the user
        const Acnumber = wittywealth(phone);
        const newUser = await UserModel.create({
            wittywealth: Acnumber,
            phone,
            referenceId: refId,
            password: randomPass,
            userType: "sub_employee",
            kycStep: 1,
            refferdBy: id
        });

        // Create children entry
        await ChildrenModel.create({
            _id: newUser._id,
            role: newUser.userType,
            parentId: id
        });

        await ChildrenModel.findByIdAndUpdate(id,
            {
                $push: {
                    children: {
                        workerId: newUser._id.toString(),
                        workerRole: newUser.userType,
                        workerLevel: 0
                    }
                }
            }
        );
        return res.status(201).json({
            message: "Employee created successfully",
            userId: newUser._id,
            password: randomPass
        });

    } catch (error) {
        console.error("Error in Employee Creation:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}




// Create a DSA

export const CreateDSA = async (req, res) => {
    const id = "68a34045f56f4a6447fb5f21";
    try {
        const { phone } = req.body;

        // Check if phone already exists
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return res.status(409).json({ message: "Phone already registered", user: { username: existingUser?.wittywealth, password: existingUser?.password } });
        }

        // Generate reference ID and password
        const refId = GenReferance();
        const randomPass = CreatePassword();

        // Create the user
        const Acnumber = wittywealth(phone);
        const newUser = await UserModel.create({
            wittywealth: Acnumber,
            phone,
            referenceId: refId,
            password: randomPass,
            userType: "dsa",
            kycStep: 1,
            refferdBy: id
        });

        await ChildrenModel.create({
            _id: newUser._id,
            role: newUser.userType,
            parentId: id
        });

        await ChildrenModel.findByIdAndUpdate(id,
            {
                $push: {
                    children: {
                        workerId: newUser._id.toString(),
                        workerRole: newUser.userType,
                        workerLevel: 0
                    }
                }
            }
        );
        return res.status(201).json({
            message: "DSA created successfully",
            userId: newUser._id,
            password: randomPass
        });
    } catch (error) {
        console.error("Error in Employee Creation:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}