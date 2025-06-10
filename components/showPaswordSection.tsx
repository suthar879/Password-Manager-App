import { Copy, Eye, EyeOff, Key, MoreVertical } from "lucide-react";
import React, { useState } from "react";

interface passwordProps {
  website: string;
  username: string;
  password: string;
}

const ShowPaswordSection = ({ passwords }: { passwords: passwordProps[] }) => {
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>(
    {}
  );

  const togglePasswordVisibility = (id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
            <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
            Your Passwords
          </h2>
        </div>
        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {passwords.length}
        </span>
      </div>

      <div className="space-y-3 h-50 overflow-auto">
        {passwords?.length === 0 && (
          <h2 className="text-center">No saved Password Record Found</h2>
        )}
        {passwords.map((password, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="text-2xl">🔗</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white truncate">
                  {password.website}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {password.username}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => togglePasswordVisibility(index)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {showPassword[index] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(password.password)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPaswordSection;
