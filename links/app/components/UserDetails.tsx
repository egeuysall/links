"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the schema with all required fields
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  message: z.string().optional(),
});

// Create a TypeScript type from the schema
type FormData = z.infer<typeof formSchema>;

export default function UserDetails() {
  // State for image preview
  const [imagePreview, setImagePreview] = useState<string>(
    "https://github.com/shadcn.png"
  );
  // Reference for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  // Define the onSubmit function
  function onSubmit(values: FormData) {
    console.log({ ...values, profileImage: imagePreview });
    // Handle form submission logic here
  }

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex items-center flex-col"
      >
        {/* Click to upload image */}
        <div className="relative">
          <Avatar
            className="w-24 h-24 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <AvatarImage src={imagePreview} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <p className="text-sm text-gray-500">
          Click on the avatar to upload image
        </p>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ege Uysal" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
