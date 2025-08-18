// components/VehicleCard.jsx
import { useState, useEffect } from "react";
import { FaCar, FaPlus, FaEye, FaHistory, FaTimesCircle, FaEdit } from "react-icons/fa";

export default function VehicleCard({ vehicle, vCatArray, vTypeArray }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [hasDocuments, setHasDocuments] = useState(false);
  const [percentagePaid, setPercentagePaid] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [bgDaysLeft, setBgDaysLeft] = useState("bg-green-500");

  useEffect(() => {
    async function fetchData() {
      // Placeholder: Fetch subscription info from backend
      const subscriptionData = await fetch(`/api/subscription/${vehicle.plateId}`).then(res => res.json());
      if (subscriptionData && subscriptionData.subscriptions?.length > 0) {
        setHasDocuments(true);

        let totalAmt = 0;
        let firstExpiry = "";
        subscriptionData.subscriptions.forEach((sub, idx) => {
          totalAmt += sub.amount;
          if (idx === 0) firstExpiry = sub.expiryDate;
        });
        setTotalAmount(totalAmt);

        // Calculate total paid
        const totalPaidResp = await fetch(`/api/payments/${vehicle.plateId}`).then(res => res.json());
        const paid = totalPaidResp.totalPaid || 0;
        setTotalPaid(paid);

        // Percentage paid
        const perc = totalAmt > 0 ? Math.min(Math.round((paid / totalAmt) * 100), 100) : 0;
        setPercentagePaid(perc);

        // Days left
        const now = new Date();
        const expiry = new Date(firstExpiry);
        let days = Math.round((expiry - now) / (1000 * 60 * 60 * 24));
        setDaysLeft(days);
        setBgDaysLeft(days < 0 ? "bg-red-500" : "bg-green-500");
      }
    }
    fetchData();
  }, [vehicle]);

  return (
    <div className="col-span-1 mb-4">
      <div className="relative shadow-lg rounded-lg overflow-hidden">
        {/* Delete Icon */}
        <button className="absolute top-2 right-2 text-red-600 text-xl">
          <FaTimesCircle />
        </button>

        <div className="p-4">
          {/* Vehicle Icon */}
          <div className="text-center text-4xl mb-2 text-gray-700">
            <FaCar />
          </div>

          {/* Vehicle Plate */}
          <h5 className="text-center border-b pb-2 mb-2">
            {vehicle.plateNo}
            {!hasDocuments && (
              <a href={`/operations?opt=add-vehicle&id=${vehicle.plateId}&edit=true`} className="block text-sm text-blue-600 mt-1">
                <FaEdit className="inline mr-1" />
                Edit details
              </a>
            )}
          </h5>

          {/* Vehicle Category and Type */}
          <div className="grid grid-cols-2 border-b py-1 text-sm">
            <div className="border-r">{vCatArray[vehicle.catFk]}</div>
            <div className="text-right">{vTypeArray[vehicle.typeFk]}</div>
          </div>

          {/* Subscription Progress */}
          {hasDocuments ? (
            <>
              <div className="mt-3">
                <div className="h-6 bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`h-6 ${percentagePaid === 100 ? "bg-green-600" : "bg-blue-500"} transition-all duration-500`}
                    style={{ width: `${percentagePaid}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm mt-1">
                  <span className="font-semibold text-green-600">${totalPaid}</span> / ${totalAmount}
                </div>
              </div>

              <div className={`${bgDaysLeft} text-white text-center py-2 mt-2 rounded`}>
                {daysLeft >= 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`}
                <div className="text-xs italic">Based on earliest expiry date</div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 text-xs text-center bg-gray-100 mt-2 py-2 rounded">
                <a href={`/operations?opt=add-document&plate_id=${vehicle.plateId}`} className="hover:text-blue-600">
                  <FaPlus className="inline mr-1" /> Add Document
                </a>
                <a href={`/operations?opt=pay&plate=${vehicle.plateId}`} className="hover:text-blue-600">
                  <FaPlus className="inline mr-1" /> Add Payment
                </a>
                <a href={`/my-account?q_plate=${vehicle.plateNo}&opt=view`} className="hover:text-blue-600">
                  <FaEye className="inline mr-1" /> View Documents
                </a>
                <a href="#" className="hover:text-blue-600">
                  <FaHistory className="inline mr-1" /> History
                </a>
              </div>
            </>
          ) : (
            <div className="mt-3 text-center text-sm bg-gray-100 py-2 rounded">
              No active subscriptions found.
              <div className="grid grid-cols-2 mt-2">
                <a href={`/operations?opt=add-document&plate_id=${vehicle.plateId}`} className="hover:text-blue-600">
                  <FaPlus className="inline mr-1" /> Add Document
                </a>
                <a href="#" className="hover:text-blue-600">
                  <FaHistory className="inline mr-1" /> History
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <span className="absolute top-2 left-2 text-sm font-semibold text-white bg-gray-800 px-2 py-1 rounded">
          {vehicle.status}
        </span>
      </div>
    </div>
  );
}
