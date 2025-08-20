import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Favicon and app icons
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", href: "/images/icon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/images/apple-touch-icon.png" },

  // DNS prefetch for external resources
  { rel: "dns-prefetch", href: "//formsubmit.co" },
  { rel: "dns-prefetch", href: "//fonts.googleapis.com" },

  // Preload critical resources
  { rel: "preload", href: "/images/hero.jpg", as: "image", type: "image/jpeg" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Let's Build Labs is developing the next generation of Web3 solutions across Africa. Join our community of 1000+ developers building decentralized technology and blockchain experiences."
        />
        <meta
          name="keywords"
          content="Web3, blockchain, decentralized technology, Africa, Web3 development, Let's Build DAO, cryptocurrency, DeFi, NFT, smart contracts, blockchain infrastructure"
        />
        <meta name="author" content="Let's Build Labs" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags for social media */}
        <meta
          property="og:title"
          content="Let's Build Labs - Innovating Web3 Technology in Africa"
        />
        <meta
          property="og:description"
          content="Building the next generation of Web3 solutions, empowering developers, and creating innovative blockchain experiences for everyone across Africa."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lbdao.xyz" />
        <meta
          property="og:image"
          content="https://labs.lbdao.xyz/images/og-image.png"
        />
        <meta
          property="og:image:alt"
          content="Let's Build Labs - Web3 Development in Africa"
        />
        <meta property="og:site_name" content="Let's Build Labs" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Let's Build Labs - Innovating Web3 Technology in Africa"
        />
        <meta
          name="twitter:description"
          content="Building the next generation of Web3 solutions, empowering developers, and creating innovative blockchain experiences for everyone across Africa."
        />
        <meta
          name="twitter:image"
          content="https://labs.lbdao.xyz/images/og-image.png"
        />
        <meta
          name="twitter:image:alt"
          content="Let's Build Labs - Web3 Development in Africa"
        />
        <meta name="twitter:site" content="@LetsBuildDAO" />
        <meta name="twitter:creator" content="@LetsBuildDAO" />

        {/* Additional SEO tags */}
        <meta name="theme-color" content="#6B46C1" />
        <meta name="msapplication-TileColor" content="#6B46C1" />
        <meta name="application-name" content="Let's Build Labs" />
        <meta name="apple-mobile-web-app-title" content="Let's Build Labs" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://labs.lbdao.xyz" />

        {/* Alternate languages */}
        <link
          rel="alternate"
          hrefLang="en"
          href="https://labs.lbdao.xyz"
        />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
