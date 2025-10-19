import { PiggyBank, CreditCard, Landmark, ShieldCheck } from 'lucide-react';

function FinanceGrid() {
  return (
    <div className='w-full bg-[#73c2fb] py-10 border-2 rounded-2xl text-center'>
      <div className='max-w-[1280px] mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 font-archivo'>
        {/* Box 1 */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 hover:shadow-lg transition">
          <PiggyBank className="text-green-600 w-8 h-8 mb-2" />
          <h4 className="text-sm font-semibold text-gray-800">Mutual Fund</h4>
        </div>

        {/* Box 2 */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 hover:shadow-lg transition">
          <CreditCard className="text-blue-600 w-8 h-8 mb-2" />
          <h4 className="text-sm font-semibold text-gray-800">Credit Cards</h4>
        </div>

        {/* Box 3 */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 hover:shadow-lg transition">
          <Landmark className="text-purple-600 w-8 h-8 mb-2" />
          <h4 className="text-sm font-semibold text-gray-800">Loan</h4>
        </div>

        {/* Box 4 */}
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center p-6 hover:shadow-lg transition">
          <ShieldCheck className="text-orange-600 w-8 h-8 mb-2" />
          <h4 className="text-sm font-semibold text-gray-800">Insurance</h4>
        </div>
      </div>
    </div>
  );
}

export default FinanceGrid;
