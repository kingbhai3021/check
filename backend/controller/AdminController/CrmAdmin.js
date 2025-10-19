import CreditCard from "../../model/CreditCard.js";
// import LoanDetails from "../../model/LoanDetails.js";
import Insurance from "../../model/Insurance.js";


// All Credit Card Data
export const Creditcard = async (req, res) => {
    try {
        const CreditCardsLeads = await CreditCard.find();
        res.status(201).json(CreditCardsLeads);
    } catch (error) {
        console.log("Admin Access Leads", error);
        res.status(401).json({ message: "Something went wrong" });

    }
}



// All Loan Data
// export const AllLoans = async (req, res) => {
//     try {
//         const AllLoan = await LoanDetails.find();
//         res.status(201).json(AllLoan);
//     } catch (error) {
//         console.log("All Loan Data", error);
//         res.status(401).json({ message: "Something Went Wrong" });
//     }
// }


// All Insurance Data
export const AllInsurance = async (req, res) => {
    try {
        const AllInsurance = await Insurance.find();
        res.status(201).json(AllInsurance);
    } catch (error) {
        console.log("All Insurance Data", error);
        res.status(401).json({ message: "Something Went Wrong" });
    }
}


