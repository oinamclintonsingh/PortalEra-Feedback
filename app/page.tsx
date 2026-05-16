"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  type Dispatch,
  type InputHTMLAttributes,
  type ReactNode,
  type SetStateAction,
} from "react";
import { sendFeedback } from "./actions/sendFeedback";

type Status = "idle" | "loading" | "success" | "error";

const projectOptions = [
  "AAA Pvt. Ltd. Website",
  "Toxic Printing Shop Website",
  "Macharee Website",
  "PortalEra",
  "Other",
];

const feedbackTypes = [
  "General feedback",
  "Technical issues",
  "Feature ideas",
  "Positive client experiences/testimonials",
];

const highlights = [
  { value: "2 min", label: "average form time" },
  { value: "24h", label: "response window" },
  { value: "100%", label: "reviewed by humans" },
];

const trustPills = ["Private by default", "Project-aware", "Actionable notes"];

export default function FeedbackPage() {
  const [status, setStatus] = useState<Status>("idle");
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
  const [spotlight, setSpotlight] = useState({ x: 50, y: 24 });

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
      return;
    }

    setStatus("success");
  };

  return (
    <main
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
      }}
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 selection:bg-indigo-500 selection:text-white ${
        isDarkMode
          ? "bg-[#0F172A] text-slate-100"
          : "bg-[#f8fbff] text-slate-950"
      }`}
      style={{
        ["--spotlight-x" as string]: `${spotlight.x}%`,
        ["--spotlight-y" as string]: `${spotlight.y}%`,
      }}
    >
      <AnimatedBackdrop isDarkMode={isDarkMode} />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1500px] gap-4 px-3 py-3 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 xl:px-10">
        <HeroPanel
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          status={status}
        />

        <section className="flex items-center lg:py-8">
          <div
            className={`relative w-full overflow-hidden rounded-[1.5rem] border p-4 shadow-2xl backdrop-blur-3xl transition-all duration-700 sm:rounded-[2rem] sm:p-6 lg:p-8 ${
              isDarkMode
                ? "border-white/[0.08] bg-slate-900/45 shadow-black/40"
                : "border-white/50 bg-white/[0.15] shadow-indigo-200/40"
            }`}
          >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70" />
            <div
              className={`pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full blur-3xl ${
                isDarkMode ? "bg-violet-400/18" : "bg-indigo-300/35"
              }`}
            />

            <div className="relative mx-auto max-w-3xl">
              <FormHeader isDarkMode={isDarkMode} status={status} />

              {status === "success" ? (
                <SuccessState
                  isDarkMode={isDarkMode}
                  onReset={() => setStatus("idle")}
                />
              ) : (
                <FeedbackForm
                  isDarkMode={isDarkMode}
                  status={status}
                  errorMessage={errorMessage}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AnimatedBackdrop({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0">
      <div
        className={`absolute inset-0 transition duration-700 ${
          isDarkMode
            ? "bg-[linear-gradient(135deg,#0F172A_0%,#111827_48%,#171136_100%)]"
            : "bg-[linear-gradient(135deg,#ffffff_0%,#eef4ff_45%,#f7f2ff_100%)]"
        }`}
      />
      <div className="aurora-field absolute inset-0 opacity-80" />
      <div
        className={`spotlight-glow absolute inset-0 transition-opacity duration-500 ${
          isDarkMode ? "opacity-70" : "opacity-55"
        }`}
      />

      <div className="float-orb absolute left-[7%] top-[8%] h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl sm:h-72 sm:w-72" />
      <div className="float-orb animation-delay-2000 absolute right-[8%] top-[18%] h-48 w-48 rounded-full bg-fuchsia-400/25 blur-3xl sm:h-64 sm:w-64" />
      <div className="float-orb animation-delay-4000 absolute bottom-[8%] left-[28%] h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl sm:h-60 sm:w-60" />

      <div className="particles absolute inset-0" />
    </div>
  );
}

function HeroPanel({
  isDarkMode,
  setIsDarkMode,
  status,
}: {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  status: Status;
}) {
  return (
    <aside className="flex items-center py-1 lg:sticky lg:top-0 lg:min-h-[calc(100vh-2rem)] lg:py-8">
      <div
        className={`relative flex w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border p-4 shadow-2xl backdrop-blur-3xl transition-all duration-700 sm:rounded-[2rem] sm:p-7 lg:min-h-[780px] lg:p-8 xl:p-10 ${
          isDarkMode
            ? "border-white/[0.08] bg-slate-950/45 shadow-black/40"
            : "border-white/55 bg-white/[0.18] shadow-indigo-200/50"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(129,140,248,0.34),transparent_28%),radial-gradient(circle_at_95%_28%,rgba(167,139,250,0.28),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.2),transparent_38%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative">
          <div className="mb-7 flex flex-col items-start gap-4 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between sm:mb-10">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/70 p-1.5 shadow-lg shadow-indigo-900/10 backdrop-blur-xl sm:h-14 sm:w-14">
                <Image
                  src="/PortalEra_Logo_WO_BG_s01.png"
                  width={172}
                  height={172}
                  alt="PortalEra logo"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300 sm:tracking-[0.24em]">
                  PortalEra
                </p>
                <p
                  className={`text-sm leading-5 ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Your Digital Story Begins Here
                </p>
              </div>
            </div>

            <ThemeToggle
              isDarkMode={isDarkMode}
              onToggle={() => setIsDarkMode((value) => !value)}
            />
          </div>

          <div
            className={`mb-4 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] backdrop-blur-xl sm:mb-5 sm:px-3.5 sm:text-xs sm:tracking-[0.18em] ${
              isDarkMode
                ? "border-white/10 bg-white/[0.07] text-indigo-100"
                : "border-white/60 bg-white/50 text-indigo-700"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Live client feedback
          </div>

          <h1 className="max-w-2xl text-[2.15rem] font-black leading-[1.08] tracking-tight min-[390px]:text-4xl sm:text-5xl xl:text-6xl">
            Shape the next PortalEra experience.
          </h1>
          <p
            className={`mt-4 max-w-xl text-[0.95rem] leading-7 sm:mt-5 sm:text-lg ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Share what felt effortless, what needs polish, and the ideas that
            would make your digital product feel sharper.
          </p>
        </div>

        <div className="relative mt-7 space-y-4 sm:mt-10 sm:space-y-5">
          <div className="grid gap-3 min-[420px]:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border p-3 backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-4 ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.07]"
                    : "border-white/60 bg-white/45"
                }`}
              >
                <p className="text-xl font-black text-indigo-500 dark:text-indigo-300 sm:text-2xl">
                  {item.value}
                </p>
                <p
                  className={`mt-1 text-xs leading-5 sm:text-sm ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`rounded-3xl border p-3 backdrop-blur-xl sm:p-4 ${
              isDarkMode
                ? "border-white/10 bg-slate-900/40"
                : "border-white/60 bg-white/45"
            }`}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold leading-5">Submission status</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                  status === "success"
                    ? "bg-emerald-400/15 text-emerald-500 dark:text-emerald-300"
                    : status === "loading"
                      ? "bg-indigo-400/15 text-indigo-500 dark:text-indigo-300"
                      : status === "error"
                        ? "bg-rose-400/15 text-rose-500 dark:text-rose-300"
                        : "bg-slate-400/15 text-slate-600 dark:text-slate-300"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/25">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-700 ${
                  status === "success"
                    ? "w-full"
                    : status === "loading"
                      ? "w-2/3 animate-pulse"
                      : status === "error"
                        ? "w-1/2"
                        : "w-1/4"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <span
                key={pill}
                className={`rounded-full border px-3 py-2 text-xs font-semibold leading-4 ${
                  isDarkMode
                    ? "border-white/10 bg-white/[0.06] text-slate-300"
                    : "border-white/60 bg-white/45 text-slate-700"
                }`}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function ThemeToggle({
  isDarkMode,
  onToggle,
}: {
  isDarkMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex h-11 w-22 shrink-0 items-center rounded-full border p-1 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400/25 sm:h-12 sm:w-24 ${
        isDarkMode
          ? "border-white/10 bg-white/10 shadow-inner shadow-black/25"
          : "border-white/70 bg-white/50 shadow-lg shadow-indigo-200/30"
      }`}
    >
      <span
        className={`absolute text-xs font-black transition duration-300 ${
          isDarkMode
            ? "left-2.5 text-slate-500 sm:left-3"
            : "left-3 text-indigo-600 opacity-100 sm:left-4"
        }`}
      >
        Light
      </span>
      <span
        className={`absolute right-2.5 text-xs font-black transition duration-300 sm:right-3 ${
          isDarkMode ? "text-indigo-100 opacity-100" : "text-slate-400"
        }`}
      >
        Dark
      </span>
      <span
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30 transition duration-300 group-hover:scale-105 sm:h-10 sm:w-10 ${
          isDarkMode ? "translate-x-11 sm:translate-x-12" : "translate-x-0"
        }`}
      >
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function FormHeader({
  isDarkMode,
  status,
}: {
  isDarkMode: boolean;
  status: Status;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300 sm:text-sm sm:tracking-[0.22em]">
          Feedback form
        </p>
        <h2 className="mt-2 text-[1.65rem] font-black leading-tight tracking-tight sm:mt-3 sm:text-4xl">
          Tell us what to improve.
        </h2>
        <p
          className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Focused details help us turn your experience into better design,
          delivery, and support.
        </p>
      </div>

      <div
        className={`inline-flex w-fit max-w-full items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold leading-4 sm:px-3.5 ${
          isDarkMode
            ? "border-white/10 bg-white/[0.06] text-slate-300"
            : "border-white/70 bg-white/45 text-slate-700"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            status === "loading"
              ? "animate-ping bg-indigo-400"
              : status === "success"
                ? "bg-emerald-400"
                : status === "error"
                  ? "bg-rose-400"
                  : "bg-cyan-400"
          }`}
        />
        Secure submission
      </div>
    </div>
  );
}

function FeedbackForm({
  isDarkMode,
  status,
  errorMessage,
  handleSubmit,
}: {
  isDarkMode: boolean;
  status: Status;
  errorMessage: string;
  handleSubmit: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={handleSubmit} className="space-y-4 sm:space-y-5">
      {status === "error" && (
        <div
          role="alert"
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-xl ${
            isDarkMode
              ? "border-rose-300/20 bg-rose-400/10 text-rose-100 shadow-rose-950/20"
              : "border-rose-200/80 bg-rose-50/80 text-rose-700 shadow-rose-200/30"
          }`}
        >
          <AlertIcon />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField
          isDarkMode={isDarkMode}
          id="name"
          name="name"
          label="Full name"
          placeholder="Your full name"
          autoComplete="name"
          required
        />
        <TextField
          isDarkMode={isDarkMode}
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextField
          isDarkMode={isDarkMode}
          id="company"
          name="company"
          label="Company or organization"
          placeholder="Company name"
          autoComplete="organization"
          optional
        />
        <TextField
          isDarkMode={isDarkMode}
          id="designation"
          name="designation"
          label="Designation"
          placeholder="Your role"
          autoComplete="organization-title"
          optional
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SelectField
          isDarkMode={isDarkMode}
          id="project"
          name="project"
          label="Project or service"
          required
          defaultValue=""
          options={projectOptions}
          placeholder="Select a project"
        />
        <SelectField
          isDarkMode={isDarkMode}
          id="type"
          name="type"
          label="Feedback type"
          defaultValue="General feedback"
          options={feedbackTypes}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="message" required>
          Message
        </FieldLabel>
        <textarea
          name="message"
          id="message"
          required
          rows={6}
          placeholder="Share what stood out, what felt unclear, or what would make this experience exceptional."
          className={`${fieldClassName(isDarkMode)} min-h-40 resize-y leading-7`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 px-4 text-sm font-black text-white shadow-2xl shadow-indigo-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-indigo-500/35 focus:outline-none focus:ring-4 focus:ring-indigo-400/35 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 sm:px-6 sm:text-base"
      >
        <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
        {status === "loading" ? (
          <>
            <SpinnerIcon />
            Sending feedback...
          </>
        ) : (
          <>
            Send feedback
            <ArrowIcon />
          </>
        )}
      </button>

      <p
        className={`text-center text-xs leading-5 ${
          isDarkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Your feedback goes directly to the PortalEra team for review.
      </p>
    </form>
  );
}

function SuccessState({
  isDarkMode,
  onReset,
}: {
  isDarkMode: boolean;
  onReset: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-5 text-center shadow-2xl backdrop-blur-2xl transition-all duration-700 sm:p-10 ${
        isDarkMode
          ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-50 shadow-emerald-950/20"
          : "border-emerald-200/80 bg-emerald-50/75 text-emerald-950 shadow-emerald-200/40"
      }`}
    >
      <div className="absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-white shadow-2xl shadow-emerald-500/30 sm:mb-6 sm:h-20 sm:w-20">
        <CheckIcon />
      </div>
      <h3 className="relative text-2xl font-black leading-tight sm:text-3xl">
        Feedback received.
      </h3>
      <p
        className={`relative mx-auto mt-3 max-w-md text-sm leading-7 sm:text-base ${
          isDarkMode ? "text-emerald-50/80" : "text-emerald-800"
        }`}
      >
        Thank you for taking the time. Your note is on its way to the PortalEra
        team and will help shape the next round of improvements.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="relative mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-400/30 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-100"
      >
        Send another response
      </button>
    </div>
  );
}

function TextField({
  isDarkMode,
  id,
  label,
  optional,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  isDarkMode: boolean;
  id: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} required={required} optional={optional}>
        {label}
      </FieldLabel>
      <input
        id={id}
        required={required}
        className={fieldClassName(isDarkMode)}
        {...props}
      />
    </div>
  );
}

function SelectField({
  isDarkMode,
  id,
  label,
  options,
  placeholder,
  required,
  defaultValue,
}: {
  isDarkMode: boolean;
  id: string;
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          name={id}
          id={id}
          required={required}
          defaultValue={defaultValue}
          className={`${fieldClassName(isDarkMode)} appearance-none pr-12`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500 dark:text-indigo-300">
          <ChevronIcon />
        </span>
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-bold">
      {children} {required && <span className="text-indigo-500">*</span>}
      {optional && (
        <span className="font-medium text-slate-400 dark:text-slate-500">
          (Optional)
        </span>
      )}
    </label>
  );
}

function fieldClassName(isDarkMode: boolean) {
  return `w-full rounded-2xl border px-3.5 py-3 text-sm shadow-inner outline-none backdrop-blur-xl transition duration-300 placeholder:transition focus:-translate-y-0.5 focus:ring-4 sm:px-4 sm:py-3.5 sm:text-base ${
    isDarkMode
      ? "border-white/[0.08] bg-slate-950/35 text-white shadow-black/20 placeholder:text-slate-500 hover:border-indigo-300/35 focus:border-indigo-300 focus:bg-slate-900/60 focus:ring-indigo-300/15"
      : "border-white/70 bg-white/45 text-slate-950 shadow-white/40 placeholder:text-slate-400 hover:border-indigo-300/80 focus:border-indigo-500 focus:bg-white/75 focus:ring-indigo-500/15"
  }`;
}

function SunIcon() {
  return (
    <svg
      className="h-5 w-5"
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
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-5 w-5"
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
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        d="M9 12.5 11.3 15 16 9m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="relative h-5 w-5 animate-spin"
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
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 0 1 4 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="relative h-5 w-5 transition duration-300 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        d="M5 12h14m-6-6 6 6-6 6"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}
