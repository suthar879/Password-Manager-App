import { CreditCard, Plus } from "lucide-react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addCard } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  number: z
    .string()
    .min(1, "Card number is required")
    .regex(/^\d{16}$/, "Card number must be exactly 16 digits")
    .transform((val) => val.replace(/\s/g, "")),
  expiry: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .refine((val) => {
      const [month, year] = val.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      const cardYear = parseInt(year);
      const cardMonth = parseInt(month);

      if (cardYear > currentYear) return true;
      if (cardYear === currentYear && cardMonth >= currentMonth) return true;
      return false;
    }, "Card has expired"),
  cvv: z
    .string()
    .min(1, "CVV is required")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  name: z
    .string()
    .min(1, "Card holder name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

type FormData = z.infer<typeof formSchema>;

const CreditCardSection = () => {
  const user = useUser();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      expiry: "",
      cvv: "",
      name: "",
    },
  });

  // Format card number with spaces as user types
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const onSubmit = (values: FormData) => {
    try {
      if (user.user) {
        addCard(
          values.number,
          values.expiry,
          values.cvv,
          values.name,
          user?.user?.id
        );
        toast.success("Card Added");
        form.reset();
        router.refresh();
      }
    } catch (error: any) {
      toast.error("Error adding card:", { description: error });
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Card Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-15 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    maxLength={19}
                    value={formatCardNumber(field.value)}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      const numbersOnly = formatted.replace(/\s/g, "");
                      field.onChange(numbersOnly);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Expiry Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM/YY"
                      className="w-full h-15 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      maxLength={5}
                      value={formatExpiry(field.value)}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    CVV
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="123"
                      className="w-full h-15 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      maxLength={4}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Card Holder Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="w-full h-15 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            disabled={form.formState.isSubmitting}
            size="lg"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            {form.formState.isSubmitting ? "Adding Card..." : "Add Card"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreditCardSection;
