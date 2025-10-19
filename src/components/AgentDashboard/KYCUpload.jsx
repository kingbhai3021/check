import React, { useState } from "react";
import { api } from "../../services/api";
import { FaUpload } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const KYCUpload = () => {
  const [kycDocs, setKycDocs] = useState({
    pan: null,
    aadhaar: null,
    cheque: null,
  });
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        setError("Only JPEG, PNG, or PDF files are allowed.");
        setSuccess("");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        setSuccess("");
        return;
      }
      setError("");
      setSuccess("");
      setKycDocs((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!kycDocs.pan || !kycDocs.aadhaar || !kycDocs.cheque) {
      setError("All documents are required.");
      return;
    }

    setIsLoading(true);
    try {
      await api.uploadKYC({ ...kycDocs, remarks });

      setSuccess("KYC submitted successfully!");
      setKycDocs({ pan: null, aadhaar: null, cheque: null });
      setRemarks("");
    } catch (err) {
      setError("Failed to submit KYC. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Client KYC Upload</h2>

      {/* Error or Success */}
      {error && <div className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">{error}</div>}
      {success && (
        <div className="text-green-700 bg-green-100 px-4 py-2 rounded mb-4 transition duration-300">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-5 space-y-6"
        aria-label="KYC Upload Form"
      >
        {["pan", "aadhaar", "cheque"].map((docType) => (
          <div key={docType}>
            <label className="block text-sm font-medium mb-2 capitalize">
              Upload {docType} {docType === "cheque" ? "" : "Card"}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e, docType)}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
                aria-label={`Upload ${docType}`}
                disabled={isLoading}
              />
              <FaUpload className="text-gray-500 text-xl" />
            </div>
            {kycDocs[docType] && (
              <p className="text-sm text-green-600 mt-1 truncate">
                Selected: {kycDocs[docType].name}
              </p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-2">Remarks (Optional)</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="E.g., Aadhaar back side missing"
            rows={3}
            disabled={isLoading}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Remarks"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 hover:shadow-md"
            }`}
            aria-label="Submit KYC"
          >
            {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
            {isLoading ? "Submitting..." : "Submit KYC"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default KYCUpload;
