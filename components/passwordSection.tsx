import { passwordData } from "@/data/password";
import { Globe, Key, User, Lock, Plus } from "lucide-react";
import React, { useState } from "react";

const PasswordSection = () => {
  const [newPassword, setNewPassword] = useState({
    website: "",
    username: "",
    password: "",
  });

  // Sample data
  const [passwords, setPasswords] = useState(passwordData);

  const handleAddPassword = () => {
    if (newPassword.website && newPassword.username && newPassword.password) {
      const newId = Math.max(...passwords.map((p) => p.id)) + 1;
      setPasswords([
        ...passwords,
        {
          id: newId,
          ...newPassword,
          favicon: "🌐",
        },
      ]);
      setNewPassword({ website: "", username: "", password: "" });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
          <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
          Add a Password
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="example.com"
              value={newPassword.website}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  website: e.target.value,
                })
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="johndoe"
              value={newPassword.username}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  username: e.target.value,
                })
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="password"
              placeholder="Enter strong password"
              value={newPassword.password}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  password: e.target.value,
                })
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleAddPassword}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Add Password
        </button>
      </div>
    </div>
  );
};

export default PasswordSection;
