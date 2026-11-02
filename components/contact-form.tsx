"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Status = "success" | "error" | null;

const formSubmitEndpoint =
  "https://formsubmit.co/309aaf2803356beb59e7a9c0c24a33fd";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!status) {
      return;
    }

    const timeoutId = window.setTimeout(() => setStatus(null), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) {
        throw new Error(`FormSubmit returned ${response.status}`);
      }

      formRef.current?.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="_subject" value="New portfolio contact message" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-2">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
              <UserIcon />
              Name
            </span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400"
              placeholder="Your name"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-2">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
              <EmailIcon />
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Enter a valid email address, such as you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="flex min-w-0 flex-col gap-2">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            <MessageIcon />
            Message
          </span>
          <textarea
            name="message"
            required
            rows={6}
            className="w-full resize-y rounded-xl border border-slate-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400"
            placeholder="Tell me about your project or just say hello..."
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-lime-400 px-7 py-3 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>

      {status ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-md animate-[contact-modal-in_300ms_ease-out] rounded-2xl border border-slate-700 bg-slate-950 p-7 text-center shadow-2xl shadow-black/50"
          >
            {status === "success" ? (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-400/15">
                  <svg viewBox="0 0 52 52" aria-hidden="true" className="h-12 w-12 text-lime-400">
                    <circle
                      cx="26"
                      cy="26"
                      r="23"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="animate-[contact-circle_500ms_ease-out]"
                    />
                    <path
                      d="M14 27l8 8 16-18"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      className="animate-[contact-check_400ms_200ms_ease-out_both]"
                    />
                  </svg>
                </div>
                <h2 className="mt-5 text-2xl font-bold text-white">
                  Message sent successfully!
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Thanks for reaching out! I&apos;ve received your message and
                  will get back to you as soon as possible.
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                  You can close this window now.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-400/15 text-3xl text-red-400">
                  !
                </div>
                <h2 className="mt-5 text-2xl font-bold text-white">
                  Message could not be sent
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Something went wrong while sending your message. Please try
                  again.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={() => setStatus(null)}
              className="mt-7 rounded-full border border-slate-600 px-6 py-2.5 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
