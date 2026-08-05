"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import styles from "./styles.module.scss";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError("");
        const response = await signIn("credentials", { password, redirect: false });
        setPending(false);
        if (!response?.ok) {
          setError("Unable to sign in");
          return;
        }
        router.replace("/");
        router.refresh();
      }}
    >
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
};

export default LoginForm;
