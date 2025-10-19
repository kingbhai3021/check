import { Card, CardContent } from "../../assets/animations/card";
import {
  UserCircle2,
  ShieldCheck,
  BadgeCheck,
  Info,
  Banknote,
  Phone,
  MapPin,
} from "lucide-react";

export default function ClientProfile() {
  const client = {
    name: "Aadesh Kadam",
    email: "aadesh@example.com",
    pan: "ABCDE1234F",
    phone: "+91-9876543210",
    nominee: "Priya Kadam",
    bankName: "HDFC Bank",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    address: "203, Tulsi Heights, Pune, Maharashtra, India",
    kycStatus: "Verified",
    riskProfile: "Moderate",
  };

  return (
    <Card className="shadow-md w-full">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
          Client Profile
        </h2>

        {/* Profile section */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <UserCircle2 className="w-16 h-16 text-blue-600" />
          <div className="text-center sm:text-left space-y-1">
            <p className="text-base sm:text-lg font-medium text-gray-900">{client.name}</p>
            <p className="text-sm text-gray-600">{client.email}</p>
          </div>
        </div>

        {/* Personal and bank info */}
        <div className="pt-2">
          <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" /> Personal & Bank Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>PAN Number: <span className="font-medium">{client.pan}</span></p>
            <p>Phone Number: <span className="font-medium">{client.phone}</span></p>
            <p>Nominee Name: <span className="font-medium">{client.nominee}</span></p>
            <p>Bank Name: <span className="font-medium">{client.bankName}</span></p>
            <p>Account Number: <span className="font-medium">{client.accountNumber}</span></p>
            <p>IFSC Code: <span className="font-medium">{client.ifscCode}</span></p>
            <p className="sm:col-span-2">Address: <span className="font-medium">{client.address}</span></p>
          </div>
        </div>

        {/* KYC and Risk Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <p>
              KYC Status: <span className="font-medium">{client.kycStatus}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 text-indigo-600" />
            <p>
              Risk Profile: <span className="font-medium">{client.riskProfile}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
