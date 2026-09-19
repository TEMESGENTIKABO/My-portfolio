"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send } from "lucide-react";

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper-faint outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20 ${
    hasError ? "border-red-500/70" : "border-line"
  }`;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Message sent — I will get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <ToastContainer theme="dark" position="bottom-right" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-paper-dim"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            {...register("name", { required: "Please enter your name" })}
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-paper-dim"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-paper-dim"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className={`${inputClass(!!errors.message)} resize-y`}
          {...register("message", { required: "Please write a message" })}
        />
        {errors.message && (
          <p role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send message"}
        {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}
