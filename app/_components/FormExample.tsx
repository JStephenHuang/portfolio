"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, TextInput } from "@/components/form";
import { Button } from "@/components/ui";

import styles from "./styles.module.scss";

const schema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

const FormExample: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
  };

  return (
    <section className={styles.section}>
      <h2>Form</h2>
      <Form methods={methods} onSubmit={onSubmit} className={styles.form}>
        <TextInput name="email" type="email" placeholder="you@example.com" fullWidth />
        <TextInput name="password" type="password" placeholder="Password" fullWidth />
        <Button.Primary type="submit" isLoading={methods.formState.isSubmitting}>
          Sign in
        </Button.Primary>
      </Form>
    </section>
  );
};

export { FormExample };
