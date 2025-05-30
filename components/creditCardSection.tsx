import { cardData } from "@/data/card";
import { CreditCard, Plus } from "lucide-react";
import React, { useState } from "react";

const CreditCardSection = () => {
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [cards, setCards] = useState(cardData);

  const handleAddCard = () => {
    if (newCard.number && newCard.expiry && newCard.cvv) {
      const newId = Math.max(...cards.map((c) => c.id)) + 1;
      const maskedNumber = "**** **** **** " + newCard.number.slice(-4);
      setCards([
        ...cards,
        {
          id: newId,
          number: maskedNumber,
          expiry: newCard.expiry,
          name: newCard.name || "Card Holder",
          type: "visa",
        },
      ]);
      setNewCard({ number: "", expiry: "", cvv: "", name: "" });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
          <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
          Add a Credit Card
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              value={newCard.expiry}
              onChange={(e) =>
                setNewCard({ ...newCard, expiry: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CVV
            </label>
            <input
              type="text"
              placeholder="123"
              value={newCard.cvv}
              onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Card Holder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleAddCard}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Add Card
        </button>
      </div>
    </div>
  );
};

export default CreditCardSection;
