import LoanAuditSchema from "../model/LoanAuditSchema.js";
import usermodel from "../model/usermodel.js";
import children from "../model/children.js";



// Create LoanAudit Schema
export const LoanAuditCreate = async (req, res) => {
    try {
        const id = "68a340af9f37cdb952b8f3c1"; // Initial user
        const user = await usermodel.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { NameOfClient, BankName, DateOfLoanApply, TypeOfLoan, LoanAmount, content } = req.body;

        const hierarchy = [{ workerId: id, workerRole: user.userType, Updated: true }];

        // Traverse up the hierarchy
        let currentId = id;
        while (true) {
            const child = await children.findById(currentId);
            if (!child || !child.parentId) break;

            const parent = await usermodel.findById(child.parentId);
            if (!parent) break;

            hierarchy.push({ workerId: parent._id, workerRole: parent.userType, Updated: false });
            currentId = child.parentId;
        }

        const audit = await LoanAuditSchema.create({
            NameOfClient,
            BankName,
            DateOfLoanApply,
            TypeOfLoan,
            LoanAmount,
            content,
            hierarchy
        });

        res.status(201).json({ message: "Loan Audit Created Successfully", audit });
    } catch (error) {
        console.error("Error at LoanAuditCreate:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// Access the LoanAudit
export const AccessLoanAudit = async (req, res) => {
    try {
        const currentUserId = "68a3408c954e68bd76f09249"; // Example: employee

        // Find audit where current user is in hierarchy
        const audit = await LoanAuditSchema.findOne({
            "hierarchy.workerId": currentUserId
        });

        if (!audit) {
            return res.status(404).json({ message: "No audit found for user" });
        }

        const hierarchy = audit.hierarchy;
        const currentIndex = hierarchy.findIndex(h => h.workerId.toString() === currentUserId);

        if (currentIndex === -1) {
            return res.status(403).json({ message: "User not in hierarchy" });
        }

        // If user is first in hierarchy, allow access
        if (currentIndex === 0) {
            return res.status(200).json({ message: "Access granted", audit });
        }

        // Check if previous user has Updated = true
        const previousUser = hierarchy[currentIndex - 1];
        if (previousUser.Updated) {
            return res.status(200).json({ message: "Access granted", audit });
        } else {
            return res.status(403).json({ message: "Access denied. Previous user has not updated." });
        }

    } catch (error) {
        console.error("Error at AccessLoanAudit:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};





// Update And send To upper Side
export const UpdateAuditParent = async (req, res) => {
    try {
        const workerId = "68a34045f56f4a6447fb5f21";

        // Mark current user's update as true
        await LoanAuditSchema.updateOne(
            { "hierarchy.workerId": workerId },
            { $set: { "hierarchy.$.Updated": true } }
        );

        // Find parent
        const child = await children.findById(workerId);
        const parentId = child?.parentId;
        if (!parentId) return res.status(404).json({ message: "No parent found" });

        const parent = await usermodel.findById(parentId);
        if (!parent) return res.status(404).json({ message: "Parent user not found" });

        // Push parent to hierarchy
        const updatedAudit = await LoanAuditSchema.findOneAndUpdate(
            { "hierarchy.workerId": workerId },
            {
                $push: {
                    hierarchy: {
                        workerId: parent._id,
                        workerRole: parent.userType,
                        Updated: false
                    }
                }
            },
            { new: true }
        );

        res.status(200).json({ message: "Audit updated and sent to parent", audit: updatedAudit });
    } catch (error) {
        console.error("Error at UpdateAuditParent:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

