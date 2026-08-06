"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorText, Form, TextInput } from "@/components/form";
import { Button } from "@/components/ui";
import { signIn } from "@/lib/action/auth";
import { isErr, isOk } from "@/lib/error";

import styles from "./styles.module.scss";

const loginSchema = z.object({
  password: z.string().min(1, "Enter your password").max(512, "Password is too long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPageView: React.FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  const { setError, formState } = methods;

  const onSubmit = (values: LoginFormValues): void => {
    startTransition(async () => {
      const result = await signIn(values);
      if (isErr(result)) {
        console.log(result);
        setError("root", { message: result.error.message });
        return;
      }

      router.replace("/admin");
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <h1>Admin</h1>
        <Form methods={methods} onSubmit={onSubmit} className={styles.form}>
          <TextInput name="password" type="password" placeholder="Password" autoComplete="current-password" fullWidth />
          <Button.Primary type="submit" isLoading={isPending}>
            Sign in
          </Button.Primary>
          <ErrorText message={formState.errors.root?.message} />
        </Form>
      </section>
    </main>
  );
};

export default LoginPageView;
