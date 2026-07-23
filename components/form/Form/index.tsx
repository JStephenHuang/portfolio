"use client";

import type React from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
} & Omit<React.ComponentPropsWithRef<"form">, "onSubmit" | "onError">;

const Form = <TFieldValues extends FieldValues>({
  methods,
  onSubmit,
  onError,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => {
          event.stopPropagation();
          void methods.handleSubmit(onSubmit, onError)(event);
        }}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export { Form };
export type { FormProps };
