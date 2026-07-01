import { Link } from "react-router-dom";
import { Network, PartyPopper, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

const previewCards = [
  {
    title: "Centralized Command",
    text: "Real-time analytics and workforce trends in a single, beautiful viewport.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD19DsKDJmOTO8yf3SYpmlCw1XrDqK3XxgCSeHWPD6dK5rcP8ujRWzdug3L6gGttq8wHJcrs62JfY_Wn0EJLBkK3tFaSPH1GPrKglpEvRqYUpfD7w6R-RoYL4QXLWniJWGsWBKLbbn2DxTkOSyR3cMgEtdVzA5KxtnVlq3bKktgV1t7gR5GkBGiICAyf0E7sPnblE1hB9pA_YUny32_2GCy4Df22zyblvzZUsZrmYPvzYsNYRrUMGbsnt2Rk_LV53DCLp7uacf377pL",
    alt: "High-fidelity dashboard UI with charts and workforce analytics.",
    className: "lg:col-span-8",
    imageClassName: "w-full h-auto",
  },
  {
    title: "Bio-Tiles",
    text: "Profiles that feel like curated spotlights on your best talent.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2ixwhXgzncScCVZAUFbTG3XetH12YyCU0JcgxNuB4AnNeJFF0bA4B2XM7l3ZJWnNDk707QnvhUm-l8uklb6uzn1y8qDHm8qUm8IOutsewIQa9dq8jlfqrPy6nEOe8GpM4QiOeWKwIHvDPMWHlW7iKaNlvd7_wvji9-noAHZuvE_YIZJI7SvRZyHhhXEt-mnJqSaW7CNU73rhI4QFERjvLZBqeufoNjbtZUsshFLjp52aRI6uBOJuCvOannxN9VRcmzfhoYEFxXytK",
    alt: "Clean employee profile screen with headshot, skill tags, and history.",
    className: "lg:col-span-4",
    imageClassName: "w-full h-full object-cover aspect-square",
  },
];

const valueProps = [
  {
    icon: Network,
    title: "Unified Ecosystem",
    text: "Stop toggling between tabs. Nest brings payroll, benefits, and performance into one seamless landscape.",
    tileClassName: "bg-(--primary-soft) text-(--primary)",
  },
  {
    icon: ShieldCheck,
    title: "Automated Compliance",
    text: "Stay protected without the paperwork. Our AI-driven guardrails keep your operations globally compliant.",
    tileClassName: "bg-(--success-soft) text-(--success)",
  },
  {
    icon: PartyPopper,
    title: "Employee Delight",
    text: "A consumer-grade experience that your team will actually enjoy using. Built for people, not just HR.",
    tileClassName: "bg-(--tertiary-soft) text-(--tertiary)",
  },
];

function PrimaryButton({
  children,
  to,
  className = "",
}: {
  children: ReactNode;
  to: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`ds-button ds-button-primary shadow-(--shadow-soft) ${className}`}
      style={{ color: "white" }}
    >
      {children}
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div
      className="min-h-screen text-(--text)"
      style={{
        background: "var(--surface)",
        fontFamily: "Proxima Nova, Segoe UI, Helvetica Neue, Arial, sans-serif",
      }}
    >
      <nav className="fixed top-0 z-50 w-full border-b border-(--border) bg-(--surface)/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="font-['Manrope'] text-2xl font-bold tracking-tight text-(--primary)"
          >
            Nest
          </Link>

          <div className="hidden items-center gap-8 font-['Manrope'] text-sm font-semibold md:flex">
            <a
              className="border-b-2 border-(--primary) pb-1"
              href="#products"
              style={{ color: "black" }}
            >
              Products
            </a>
            <a
              className="transition-colors"
              href="#pricing"
              style={{ color: "black" }}
            >
              Pricing
            </a>
            <a
              className="transition-colors"
              href="#about"
              style={{ color: "black" }}
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/signin"
              className="font-['Manrope'] text-sm font-semibold transition-all duration-300 active:scale-95"
              style={{ color: "black" }}
            >
              Login
            </Link>
            <PrimaryButton
              to="/signup?mode=trial"
              className="rounded-lg px-4 py-2.5 font-['Manrope'] text-sm font-semibold text-white sm:px-6"
            >
              Get Free Trial
            </PrimaryButton>
            <a
              href="#products"
              className="ds-button ds-button-secondary rounded-lg px-4 py-2.5 font-['Manrope'] text-sm font-semibold sm:px-6"
              style={{ color: "black" }}
            >
              Take a Tour
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="relative overflow-hidden px-5 pb-28 pt-16 sm:px-8 lg:pt-20">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="relative z-10">
              <span className="ds-pill mb-6 uppercase tracking-wider">
                Introducing Nest
              </span>
              <h1 className="mb-8 font-['Manrope'] text-5xl font-extrabold leading-[1.08] tracking-tight text-(--text) md:text-7xl">
                The Future of <span className="text-(--primary)">People Management</span>
              </h1>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-(--text-muted) sm:text-xl">
                A curated ecosystem designed to protect your culture and scale your talent. Move
                beyond spreadsheets into a world of automated excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton
                  to="/signup?mode=trial"
                  className="rounded-xl px-8 py-4 font-['Manrope'] text-lg font-bold"
                >
                  Start Free Trial
                </PrimaryButton>
                <Link
                  to="/signup?mode=demo"
                  className="ds-button ds-button-secondary px-8 py-4 font-['Manrope'] text-lg"
                >
                  Request Demo
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="ds-card relative z-10 overflow-hidden p-2">
                <img
                  className="aspect-[4/3] h-auto w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjrylKZdXYHyf1Z-_J_bD-be7QslAHBN2zBVDoAjW4gGktB0PSxj06KIF4J88Q4k5DMUX36qjrwfvMyCO-Av0DEQiFjWFJXa0Skz3GyjHNCXpUMrWkSdR1WUHhHf8ZSNuBU5BwBlLSfJfB8MO1Va4-1gnBmVuDPzZKTr0I5CicykZc9uZiHQldGPxFWkFJQEstOmZUyEF-VjpKe1vvp0pCLSV06FcLSQ6yeZsVTEiR7ixdH302LU7g2ouEusKwF56o4R2jYm9GrnQ0"
                  alt="Modern office space with a team collaborating at wooden desks."
                />
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="bg-(--surface-2) px-5 py-28 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 lg:mb-20">
              <h2 className="mb-4 font-['Manrope'] text-4xl font-extrabold text-(--text)">
                Crafted for Clarity
              </h2>
              <p className="text-lg text-(--text-muted)">
                Sophisticated interfaces that turn complex data into actionable insights.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              {previewCards.map((card) => (
                <article
                  key={card.title}
                  className={`${card.className} ds-card p-4`}
                >
                  <div className="overflow-hidden rounded-lg bg-(--surface-2)">
                    <img className={card.imageClassName} src={card.image} alt={card.alt} />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="mb-2 font-['Manrope'] text-2xl font-bold">{card.title}</h3>
                    <p className="text-(--text-muted)">{card.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-(--surface) px-5 py-28 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center lg:mb-24">
              <h2 className="mb-6 font-['Manrope'] text-5xl font-extrabold tracking-tight">
                Why Nest?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-(--primary)" />
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {valueProps.map(({ icon: Icon, title, text, tileClassName }) => (
                <article className="group" key={title}>
                  <div
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${tileClassName}`}
                  >
                    <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={2.1} />
                  </div>
                  <h3 className="mb-4 font-['Manrope'] text-2xl font-bold">{title}</h3>
                  <p className="leading-relaxed text-(--text-muted)">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-5 pb-28 sm:px-8 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-2xl bg-(--primary) p-10 text-center shadow-(--shadow-strong) sm:p-16 md:p-24">
              <div className="relative z-10">
                <h2 className="mb-8 font-['Manrope'] text-4xl font-extrabold text-white md:text-5xl">
                  Ready to build your Nest?
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-lg text-white/80 sm:text-xl">
                  Join 1,200+ fast-growing companies that trust Nest to curate their most important
                  asset: their people.
                </p>
                <Link
                  to="/signup?mode=trial"
                  className="ds-button ds-button-primary px-10 py-5 font-['Manrope'] text-lg font-bold hover:-translate-y-1 hover:shadow-xl sm:text-xl"
                  style={{ color: "white" }}
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-(--border) bg-(--surface-2) px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="text-lg font-bold text-(--primary)">
            Nest
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-(--text-muted)">
            <a className="transition-colors hover:text-(--primary) hover:underline" href="#privacy">
              Privacy Policy
            </a>
            <a className="transition-colors hover:text-(--primary) hover:underline" href="#terms">
              Terms of Service
            </a>
            <a className="transition-colors hover:text-(--primary) hover:underline" href="#security">
              Security
            </a>
            <a className="transition-colors hover:text-(--primary) hover:underline" href="#contact">
              Contact
            </a>
          </div>
          <p className="text-center text-xs text-(--text-muted)">
            © 2026 Nest HR Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
