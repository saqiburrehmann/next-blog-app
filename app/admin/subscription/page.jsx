"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// ✅ Correct (matches filename exactly)
import SubScriptionTableItem from '@/components/AdminComponents/SubscriptionTableItem';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/email");
        setSubscriptions(res.data.subscriptions || []);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
        toast.error("Failed to fetch subscriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const deleteEmail = async (id) => {
    try {
      const response = await axios.delete(`/api/email`, {
        params: { id },
      });

      if (response.data.success) {
        // Remove the deleted email from the state
        setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
        toast.success(response.data.msg);
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting subscription");
    }
  };

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl font-semibold">All Subscriptions</h1>

      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Email Subscription</th>
              <th className="px-6 py-3 hidden sm:block">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">
                  Loading subscriptions...
                </td>
              </tr>
            ) : subscriptions.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">
                  No subscriptions found.
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <SubScriptionTableItem
                  key={sub._id}
                  email={sub.email}
                  date={sub.createdAt}
                  id={sub._id}
                  onDelete={deleteEmail}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Toast notifications container */}
      <ToastContainer theme="dark"/>
    </div>
  );
};

export default Page;
