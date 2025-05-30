"use client";

import PasswordSection from "@/components/passwordSection";
import CreditCardSection from "@/components/creditCardSection";
import ShowPaswordSection from "@/components/showPaswordSection";
import ShowCardSection from "@/components/showCardSection";
import { Shield } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
              Password Manager
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Password Section */}
          <PasswordSection />

          {/* Add Credit Card Section */}
          <CreditCardSection />

          {/* Your Passwords Section */}
          <ShowPaswordSection />

          {/* Your Cards Section */}
          <ShowCardSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
