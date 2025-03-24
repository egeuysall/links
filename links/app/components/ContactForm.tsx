"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "sonner";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    try {
      // Send data to our API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        // Try to get error message from response if possible
        let errorMessage = "Failed to send message";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // If JSON parsing fails, try to get text
          try {
            const textError = await response.text();
            errorMessage = textError || `Server error: ${response.status}`;
          } catch (textError) {
            // If both fail, use status text
            errorMessage = `Server error: ${
              response.statusText || response.status
            }`;
          }
        }
        throw new Error(errorMessage);
      }

      // Only parse JSON if response was OK
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("Error parsing response:", jsonError);
        throw new Error("Invalid response from server");
      }

      // Show success message
      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "Your message couldn't be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">First Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John" 
                      className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col py-6 px-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]" 
                      {...field} 
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
                  <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">Last Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Doe" 
                      className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col py-6 px-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col py-6 px-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold text-[#593116] tracking-tight">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here..."
                    className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none min-h-[120px] text-lg font-bold text-[#593116] tracking-tight w-full bg-[#E6CCB2] border-2 border-[#7F5539] flex flex-col p-4 rounded-lg placeholder:text-[#B08968] caret-[#593116]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none w-full bg-[#B08968] text-[#EDE0D4] p-7 space-x-3 border-2 border-[#E6CCB2] rounded-lg text-xl font-bold transition-colors duration-300" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </>
  );
}