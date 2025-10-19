import CreditCard from "../model/CreditCard.js";
// import LoanDetails from "../model/LoanDetails.js";
import insurance from "../model/Insurance.js";

// Credit card detailsleads
export const CreditCardLeads = async (req, res) => {
    try {
        const Leads = req.body;
        const { name, email, phone, pannumber } = Leads;
        if (!name || !email || !phone || !pannumber) {
            res.status(400).json({ message: "All fields are required" });
        }
        const creditCard = new CreditCard({
            name,
            email,
            phone,
            pannumber
        });
        await creditCard.save();
        res.status(200).json({ message: "Credit Card Details Added Successfully" });
    } catch (error) {
        console.log("CreditCard Error", error);
        res.status(500).json({ message: "Error adding Credit Card Details" });
    }
}

// Loan Details
// export const Loan = async (req, res) => {
//     try {
//         const LoanLeads = req.body;

//         const { loanAmount, MonthlySalary, CompanyName, City, Tenure, Name, phone, MonthlyEmi, dob } = LoanLeads;
//         if (!loanAmount || !MonthlySalary || !CompanyName || !City || !Tenure || !Name || !phone || !MonthlyEmi || !dob) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const loanDetails = new LoanDetails({
//             loanAmount,
//             MonthlySalary,
//             CompanyName,
//             City,
//             Tenure,
//             Name,
//             phone,
//             MonthlyEmi,
//             dob
//         });

//         await loanDetails.save();
//         res.status(200).json({ message: "Loan Details Added Successfully" });
//     } catch (error) {

//     }
// }



// Insurance leads
export const Insurance = async (req, res) => {
    const insurance = req.body;
    try {
        await insurance.save(insurance);
    } catch (error) {
        console.log("CRM insurance", error);
        res.status(401).json({ message: "Internal Server Error" });
    }
}


