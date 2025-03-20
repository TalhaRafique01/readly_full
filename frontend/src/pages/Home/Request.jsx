import React, { useState, useEffect } from "react";

const RequestReviewPage = () => {
  const [swapRequest, setSwapRequest] = useState(null);

  useEffect(() => {
    // Simulating fetching the request from localStorage
    const storedRequest = JSON.parse(localStorage.getItem("swapRequest"));
    if (storedRequest) {
      setSwapRequest(storedRequest);
    }
  }, []);

  const handleAccept = () => {
    if (swapRequest) {
      alert(`Swap request accepted!`);
      // Here you would update the request status in a database or backend system
      localStorage.removeItem("swapRequest");
      setSwapRequest(null); // Clear request after acceptance
    }
  };

  const handleReject = () => {
    if (swapRequest) {
      alert(`Swap request rejected.`);
      // Here you would update the request status in a database or backend system
      localStorage.removeItem("swapRequest");
      setSwapRequest(null); // Clear request after rejection
    }
  };

  if (!swapRequest) {
    return <div>No swap requests available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Swap Request Review</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-orange-600">Request Details</h3>
          <p><strong>Name:</strong> {swapRequest.name}</p>
          <p><strong>Phone:</strong> {swapRequest.phone}</p>
          <p><strong>Email:</strong> {swapRequest.email}</p>
          <p><strong>Current Book:</strong> {swapRequest.currentBookTitle} by {swapRequest.currentBookAuthor}</p>
          <p><strong>Swapped Book:</strong> {swapRequest.swappedBookTitle} by {swapRequest.swappedBookAuthor}</p>
          <p><strong>Delivery Method:</strong> {swapRequest.deliveryMethod}</p>
          <p><strong>Preferred Swap Date:</strong> {swapRequest.swapDate}</p>
          <p><strong>Notes:</strong> {swapRequest.notes || "No special requests"}</p>
        </div>

        <div className="flex justify-center space-x-6">
          <button
            onClick={handleAccept}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Accept Request
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reject Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestReviewPage;
