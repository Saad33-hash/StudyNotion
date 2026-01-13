import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch purchase history from API
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/Courseroutes/getPurchaseHistory`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        console.log("Purchase history response:", result);

        if (result.success) {
          setPurchases(result.purchases);
        } else {
          setPurchases([]);
        }
      } catch (error) {
        console.log("Error fetching purchase history:", error);
        setPurchases([]);
      }
      setLoading(false);
    };

    if (token) {
      fetchPurchaseHistory();
    }
  }, [token]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status color
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-caribbeangreen-800 text-caribbeangreen-100";
      case "Pending":
        return "bg-yellow-800 text-yellow-100";
      case "Failed":
        return "bg-pink-800 text-pink-100";
      case "Refunded":
        return "bg-blue-800 text-blue-100";
      default:
        return "bg-richblack-600 text-richblack-100";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[1200px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-richblack-300">
        <span
          onClick={() => navigate("/")}
          className="hover:text-richblack-50 cursor-pointer"
        >
          Home
        </span>
        <span>/</span>
        <span
          onClick={() => navigate("/dashboard/my-profile")}
          className="hover:text-richblack-50 cursor-pointer"
        >
          Dashboard
        </span>
        <span>/</span>
        <span className="text-yellow-50 font-medium">Purchase History</span>
      </nav>

      {/* Page Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5">
        Purchase History
      </h1>

      {/* Purchases List */}
      {purchases.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] bg-richblack-800 rounded-xl border border-richblack-700 p-8">
          <HiOutlineReceiptRefund className="text-6xl text-richblack-500" />
          <p className="text-richblack-300 text-lg text-center">
            You haven't made any purchases yet.
          </p>
          <p className="text-richblack-400 text-sm text-center">
            Start learning by purchasing your first course!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-all mt-2"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <>
          {/* Table Header - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-richblack-700 rounded-t-xl text-richblack-200 text-sm font-medium">
            <div className="col-span-2">Order ID</div>
            <div className="col-span-4">Course</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Purchase Rows */}
          <div className="flex flex-col gap-4 md:gap-0">
            {purchases.map((purchase, index) => (
              <div
                key={purchase._id || index}
                className={`
                  flex flex-col md:grid md:grid-cols-12 gap-4 p-4 
                  bg-richblack-800 border border-richblack-700
                  ${index === 0 ? "md:rounded-t-none md:border-t-0" : ""}
                  ${index === purchases.length - 1 ? "rounded-b-xl" : ""}
                  rounded-xl md:rounded-none
                `}
              >
                {/* Order ID */}
                <div className="md:col-span-2 flex flex-col md:justify-center">
                  <span className="text-richblack-400 text-xs md:hidden mb-1">
                    Order ID
                  </span>
                  <span className="text-richblack-5 text-sm font-mono">
                    #{purchase.orderId}
                  </span>
                </div>

                {/* Course */}
                <div className="md:col-span-4 flex flex-col md:justify-center">
                  <span className="text-richblack-400 text-xs md:hidden mb-1">
                    Course
                  </span>
                  <div className="flex flex-col gap-1">
                    {purchase.courses?.map((course, idx) => (
                      <span
                        key={course._id || idx}
                        className="text-richblack-5 text-sm cursor-pointer hover:text-yellow-50 transition-all"
                        onClick={() => navigate(`/courses/${course._id}`)}
                      >
                        {course.courseName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="md:col-span-2 flex flex-col md:justify-center">
                  <span className="text-richblack-400 text-xs md:hidden mb-1">
                    Date
                  </span>
                  <span className="text-richblack-300 text-sm">
                    {formatDate(purchase.purchaseDate)}
                  </span>
                </div>

                {/* Amount */}
                <div className="md:col-span-2 flex flex-col md:justify-center">
                  <span className="text-richblack-400 text-xs md:hidden mb-1">
                    Amount
                  </span>
                  <span className="text-yellow-50 font-semibold">
                    Rs. {purchase.amount?.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Status */}
                <div className="md:col-span-2 flex flex-col md:justify-center">
                  <span className="text-richblack-400 text-xs md:hidden mb-1">
                    Status
                  </span>
                  <span
                    className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      purchase.status
                    )}`}
                  >
                    {purchase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center p-4 bg-richblack-800 rounded-xl border border-richblack-700 mt-4">
            <span className="text-richblack-300">
              Total Transactions: {purchases.length}
            </span>
            <span className="text-richblack-5 font-semibold">
              Total Spent: Rs.{" "}
              {purchases
                .reduce((acc, p) => acc + (p.amount || 0), 0)
                .toLocaleString("en-IN")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseHistory;