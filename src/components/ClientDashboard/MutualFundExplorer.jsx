import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Search } from "lucide-react";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "../../assets/animations/card";
import { Button } from "../../assets/animations/button";

const mockFunds = [
  { id: 1, name: "HDFC Equity Fund", category: "Equity", nav: 342.5 },
  { id: 2, name: "SBI Bluechip Fund", category: "Large Cap", nav: 198.3 },
  { id: 3, name: "Axis Midcap Fund", category: "Mid Cap", nav: 284.2 },
];

export default function MutualFundExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFund, setSelectedFund] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseType, setPurchaseType] = useState("lumpsum");
  const [amount, setAmount] = useState("");
  const [sipDay, setSipDay] = useState("");

  const filteredFunds = mockFunds.filter((fund) =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (fund) => {
    setSelectedFund(fund);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAmount("");
    setSipDay("");
    setPurchaseType("lumpsum");
  };

  const handlePurchase = () => {
    if (!amount || (purchaseType === "sip" && !sipDay)) {
      toast.error("Please enter all required fields.");
      return;
    }

    toast.success(
      purchaseType === "lumpsum"
        ? `Lumpsum of ₹${amount} invested in ${selectedFund.name}`
        : `SIP of ₹${amount}/month scheduled on day ${sipDay} for ${selectedFund.name}`
    );
    closeModal();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mutual Fund Explorer</h2>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a mutual fund..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredFunds.map((fund) => (
          <Card key={fund.id}>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold">{fund.name}</h3>
              <p className="text-sm text-gray-500">Category: {fund.category}</p>
              <p className="text-sm text-gray-500">NAV: ₹{fund.nav}</p>
              <Button onClick={() => openModal(fund)} className="mt-2 w-full">
                Invest
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Purchase Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Invest in {selectedFund?.name}
                  </Dialog.Title>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      Investment Type
                    </label>
                    <select
                      value={purchaseType}
                      onChange={(e) => setPurchaseType(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="lumpsum">Lumpsum</option>
                      <option value="sip">SIP</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {purchaseType === "sip" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">
                        SIP Day (1–28)
                      </label>
                      <select
                        value={sipDay}
                        onChange={(e) => setSipDay(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a day</option>
                        {[...Array(28)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-3">
                    <Button onClick={closeModal} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handlePurchase}>Confirm</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
