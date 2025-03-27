"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Updated form schema with first name and last name
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function StartNewsletter() {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with updated default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      // Show success message
      toast.success("Successfully subscribed to the newsletter!");
      form.reset();
    } catch (error) {
      // Show error message
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while subscribing"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full" id="newsletter">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      disabled={isLoading}
                      className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col py-7 px-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      disabled={isLoading}
                      className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col py-7 px-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="lg:grid lg:grid-cols-4 lg:gap-4 lg:items-end space-y-4 lg:space-y-0">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="lg:col-span-3">
                  <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@example.com"
                      {...field}
                      type="email"
                      disabled={isLoading}
                      className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col py-7 px-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none w-full bg-[#B08968] text-[#EDE0D4] p-7 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-xl font-bold transition-colors duration-300 lg:col-span-1"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}