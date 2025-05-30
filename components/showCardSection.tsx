import { cardData } from "@/data/card";
import { CreditCard, MoreVertical } from "lucide-react";
import React, { useState } from "react";

const ShowCardSection = () => {
      const [cards, setCards] = useState(cardData);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
            <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
            Your Cards
          </h2>
        </div>
        <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {cards.length}
        </span>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-lg font-medium text-gray-900 dark:text-white">
                  {card.number}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {card.name}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {card.expiry}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Expires
                </div>
              </div>
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

export default ShowCardSection;
