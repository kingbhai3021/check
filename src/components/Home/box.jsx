import { Users, Banknote, BarChart, Briefcase } from 'lucide-react';

function FinanceGrid() {
  return (
    <div className="w-full bg-[#E8F6FF] py-8 text-center rounded-2xl shadow-inner">
      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 font-archivo">
        
        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition-all duration-200">
          <Users className="text-blue-600 w-8 h-8 mb-2" />
          <h4 className="text-base font-semibold text-gray-800">2.5M+</h4>
          <p className="text-xs text-gray-500">Happy Customers</p>
        </div>

        {/* Funds Managed */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition-all duration-200">
          <Banknote className="text-green-600 w-8 h-8 mb-2" />
          <h4 className="text-base font-semibold text-gray-800">₹4,200 Cr+</h4>
          <p className="text-xs text-gray-500">Funds Managed</p>
        </div>

        {/* Active Partners */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition-all duration-200">
          <Briefcase className="text-purple-600 w-8 h-8 mb-2" />
          <h4 className="text-base font-semibold text-gray-800">18K+</h4>
          <p className="text-xs text-gray-500">Active Partners</p>
        </div>

        {/* Daily Transactions */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition-all duration-200">
          <BarChart className="text-orange-500 w-8 h-8 mb-2" />
          <h4 className="text-base font-semibold text-gray-800">5L+</h4>
          <p className="text-xs text-gray-500">Daily Transactions</p>
        </div>

      </div>
    </div>
  );
}

export default FinanceGrid;
