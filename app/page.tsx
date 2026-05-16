"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { sendFeedback } from "./actions/sendFeedback";

const projectOptions = [
  "AAA Pvt. Ltd. Website",
  "Toxic Printing Shop Website",
  "Macharee Website",
  "PortalEra",
  "Other",
];

export default function FeedbackPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedTheme = window.localStorage.getItem("portalera-feedback-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return savedTheme ? savedTheme === "dark" : prefersDark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem(
      "portalera-feedback-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    setErrorMessage("");
    const result = await sendFeedback(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 selection:bg-teal-500 selection:text-white ${
        isDarkMode
          ? "bg-[#0d1117] text-slate-100"
          : "bg-[#f6f8fb] text-slate-950"
      }`}
    >
      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-500 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_36%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.12),transparent_34%)]"
        }`}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <section
          className={`grid w-full overflow-hidden rounded-[2rem] border shadow-2xl transition-all duration-500 lg:grid-cols-[0.85fr_1.15fr] ${
            isDarkMode
              ? "border-white/10 bg-slate-950/84 shadow-black/40"
              : "border-white bg-white/90 shadow-slate-200/80"
          }`}
        >
          <aside
            className={`relative flex min-h-[320px] flex-col justify-between overflow-hidden p-6 sm:p-8 lg:min-h-[760px] lg:p-10 ${
              isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-950"
            }`}
          >
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-[linear-gradient(135deg,rgba(20,184,166,0.26),transparent_38%),linear-gradient(315deg,rgba(245,158,11,0.22),transparent_42%)]"
                  : "bg-[linear-gradient(135deg,rgba(20,184,166,0.16),transparent_42%),linear-gradient(315deg,rgba(245,158,11,0.16),transparent_46%)]"
              }`}
            />
            <div className="relative">
              <div className="mb-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg shadow-black/20">
                    <Image
                      src="/PortalEra_Logo_WO_BG_s01.png"
                      width={172}
                      height={172}
                      alt="PortalEra logo"
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                        isDarkMode ? "text-teal-200" : "text-teal-700"
                      }`}
                    >
                      PortalEra
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Your Digital Story Begins Here
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDarkMode((value) => !value)}
                  aria-pressed={isDarkMode}
                  aria-label={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                  title={
                    isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                  className={`group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-sm transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-300/35 ${
                    isDarkMode
                      ? "border-white/15 bg-white/10 text-white hover:bg-white/18"
                      : "border-slate-200 bg-white text-slate-950 hover:border-teal-300 hover:bg-teal-50"
                  }`}
                >
                  {isDarkMode ? (
                    <svg
                      className="h-5 w-5 transition duration-300 group-hover:rotate-12 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.06 16.94l-1.42 1.42m12.72 0-1.42-1.42M7.06 7.06 5.64 5.64M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 transition duration-300 group-hover:-rotate-12 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <p
                className={`mb-5 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
                  isDarkMode
                    ? "border-teal-300/20 bg-teal-300/10 text-teal-100"
                    : "border-teal-200 bg-teal-50 text-teal-800"
                }`}
              >
                Client Feedback
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Help us build better digital experiences.
              </h1>
              <p
                className={`mt-5 max-w-md text-base leading-7 sm:text-lg ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Share what worked, what felt difficult, and where PortalEra can
                make your workflow smoother.
              </p>
            </div>

            <div className="relative mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {["Fast review", "Clear context", "Secure delivery"].map(
                (item) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur ${
                      isDarkMode
                        ? "border-white/10 bg-white/[0.07]"
                        : "border-slate-200 bg-white/70"
                    }`}
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-teal-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 13 4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-slate-100" : "text-slate-700"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </aside>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.18em] ${isDarkMode ? "text-teal-300" : "text-teal-700"}`}
                >
                  Feedback Form
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Tell us about your experience
                </h2>
                <p
                  className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  A few focused details help us respond thoughtfully and keep
                  improving the work we deliver.
                </p>
              </div>

              {status === "success" ? (
                <div
                  className={`rounded-3xl border p-7 text-center shadow-sm transition-all duration-500 ${
                    isDarkMode
                      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-50"
                      : "border-emerald-200 bg-emerald-50 text-emerald-950"
                  }`}
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12.5 11.3 15 16 9m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">
                    Thank you for the feedback.
                  </h3>
                  <p
                    className={`mx-auto mt-3 max-w-md leading-7 ${isDarkMode ? "text-emerald-100/80" : "text-emerald-800"}`}
                  >
                    Your message has been sent successfully. We appreciate the
                    time you took to help us improve.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400/30"
                  >
                    Send another response
                  </button>
                </div>
              ) : (
                <form action={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div
                      role="alert"
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        isDarkMode
                          ? "border-red-400/30 bg-red-400/10 text-red-100"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold">
                        Email Address <span className="text-teal-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoComplete="email"
                        placeholder="clinton@example.com"
                        className={fieldClassName(isDarkMode)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold">
                        Full Name <span className="text-teal-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        autoComplete="name"
                        placeholder="Oinam Clinton Singh"
                        className={fieldClassName(isDarkMode)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="text-sm font-semibold"
                      >
                        Company/Organization{" "}
                        <span
                          className={
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }
                        >
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        placeholder="PortalEra, AAA Pvt. Ltd."
                        className={fieldClassName(isDarkMode)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="designation"
                        className="text-sm font-semibold"
                      >
                        Designation{" "}
                        <span
                          className={
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }
                        >
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="designation"
                        id="designation"
                        autoComplete="organization-title"
                        placeholder="Founder, Manager, Developer"
                        className={fieldClassName(isDarkMode)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="project"
                        className="text-sm font-semibold"
                      >
                        Project or Service by PortalEra{" "}
                        <span className="text-teal-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="project"
                          id="project"
                          required
                          defaultValue=""
                          className={`${fieldClassName(isDarkMode)} appearance-none pr-11`}
                        >
                          <option value="" disabled>
                            Select a project
                          </option>
                          {projectOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <svg
                          className={`pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-semibold">
                        Feedback Type
                      </label>
                      <div className="relative">
                        <select
                          name="type"
                          id="type"
                          className={`${fieldClassName(isDarkMode)} appearance-none pr-11`}
                        >
                          <option value="General feedback">
                            General feedback
                          </option>
                          <option value="Technical issues">
                            Technical issues
                          </option>
                          <option value="Feature ideas">Feature ideas</option>
                          <option value="Positive client experiences/testimonials">
                            Positive client experiences/testimonials
                          </option>
                        </select>
                        <svg
                          className={`pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold">
                      Message <span className="text-teal-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us what stood out, what could be better, or what you would like next..."
                      className={`${fieldClassName(isDarkMode)} min-h-36 resize-y leading-7`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-teal-600 px-6 text-base font-bold text-white shadow-xl shadow-teal-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-teal-700/25 focus:outline-none focus:ring-4 focus:ring-teal-400/35 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 0 1 4 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"
                          />
                        </svg>
                        Sending feedback...
                      </>
                    ) : (
                      <>
                        Send Feedback
                        <svg
                          className="h-5 w-5 transition duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14m-6-6 6 6-6 6"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function fieldClassName(isDarkMode: boolean) {
  return `w-full rounded-2xl border px-4 py-3.5 text-base outline-none transition duration-300 placeholder:transition focus:-translate-y-0.5 focus:ring-4 ${
    isDarkMode
      ? "border-white/10 bg-white/[0.06] text-white placeholder:text-slate-500 hover:border-teal-300/40 focus:border-teal-300 focus:bg-white/[0.09] focus:ring-teal-300/15"
      : "border-slate-200 bg-slate-50 text-slate-950 placeholder:text-slate-400 hover:border-teal-300 focus:border-teal-500 focus:bg-white focus:ring-teal-500/15"
  }`;
}
