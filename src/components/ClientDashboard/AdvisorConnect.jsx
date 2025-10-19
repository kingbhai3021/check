import { Phone, Mail, Video } from "lucide-react";
import { Card, CardContent } from "../../assets/animations/card";
import { Button } from "../../assets/animations/button";

const advisor = {
  name: "Amit Sharma",
  designation: "Certified Mutual Fund Advisor",
  email: "amit.sharma@wittywealth.com",
  phone: "+91 98765 43210",
  initials: "AS",
};

export default function AdvisorConnect() {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Advisor Avatar */}
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center border border-gray-300">
          <span className="text-white text-xl font-bold">{advisor.initials}</span>
        </div>

        {/* Advisor Info */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800">{advisor.name}</h3>
          <p className="text-sm text-gray-500">{advisor.designation}</p>
          <p className="text-sm text-gray-600">📧 {advisor.email}</p>
          <p className="text-sm text-gray-600">📞 {advisor.phone}</p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
            <Button variant="default" className="gap-2 w-full sm:w-auto">
              <Phone className="w-4 h-4" /> Call Advisor
            </Button>
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Mail className="w-4 h-4" /> Email
            </Button>
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Video className="w-4 h-4" /> Video Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
