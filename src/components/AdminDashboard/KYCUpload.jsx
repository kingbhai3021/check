import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const KYCUpload = () => {
  const [kycDocs, setKycDocs] = useState({ pan: null, aadhaar: null, cheque: null });
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg","image/png","application/pdf"].includes(file.type)) { setError("Only JPEG/PNG/PDF"); setSuccess(""); return; }
      if (file.size > 5 * 1024 * 1024) { setError("Max 5MB"); setSuccess(""); return; }
      setError(""); setSuccess(""); setKycDocs((p)=>({ ...p, [type]: file }));
    }
  };

  const mockUpload = () => new Promise((res)=>setTimeout(res,1500));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!kycDocs.pan || !kycDocs.aadhaar || !kycDocs.cheque) { setError("All docs required"); return; }
    setIsLoading(true);
    try {
      await mockUpload();
      setSuccess("KYC submitted!");
      setKycDocs({ pan:null, aadhaar:null, cheque:null });
      setRemarks("");
    } catch {
      setError("Failed to upload");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">KYC Upload</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-3">{success}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        {["pan","aadhaar","cheque"].map((d) => (
          <div key={d}>
            <label className="block text-sm font-medium mb-1">Upload {d}</label>
            <div className="flex items-center gap-3">
              <input disabled={isLoading} onChange={(e)=>handleFileChange(e,d)} accept="image/*,.pdf" type="file" className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700" />
              <FaUpload className="text-xl text-gray-500" />
            </div>
            {kycDocs[d] && <div className="text-sm text-green-600 mt-1">Selected: {kycDocs[d].name}</div>}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Remarks</label>
          <textarea value={remarks} onChange={(e)=>setRemarks(e.target.value)} className="w-full border p-2 rounded" rows={3} />
        </div>

        <div className="flex justify-end">
          <button disabled={isLoading} className={`px-4 py-2 rounded text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
            {isLoading ? <><AiOutlineLoading3Quarters className="animate-spin inline mr-2" />Submitting...</> : "Submit KYC"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KYCUpload;
