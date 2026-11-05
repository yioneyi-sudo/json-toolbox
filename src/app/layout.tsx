
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Free Online JSON Toolbox",
  description:
    "Format, validate, and minify JSON online for free. Upload JSON files, fix syntax errors, and download formatted JSON. Fast, secure, and easy to use.",
  keywords: [
    "JSON Formatter",
    "JSON Validator",
    "JSON Minifier",
    "Format JSON Online",
    "JSON Tools",
    "JSON Beautifier",
  ],
  applicationName: "JSON Toolbox",
  openGraph: {
    title: "JSON Formatter & Validator - JSON Toolbox",
    description:
      "Free online tools to format, validate, and minify JSON. Your data stays in your browser.",
    siteName: "JSON Toolbox",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "0sv2lh7WHng1W5eb6KMGkWIes9DPYIveQzIooyw62Ao",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {/* 在页面内容渲染前应用已保存的主题，避免主题闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem("json-toolbox-theme");
                  var isDark = savedTheme !== "light";
                  document.body.classList.toggle("dark-mode", isDark);
                } catch (error) {
                  document.body.classList.add("dark-mode");
                }
              })();
            `,
          }}
        />

        <ThemeProvider>
          <header className="header">
            <div className="logo">
              <Link href="/" className="logo-link">
                <span className="logo-icon">{"{ }"}</span>
                JSON Toolbox
              </Link>
            </div>

            <nav className="main-nav">
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/contact">Contact</Link>
            </nav>

            <div className="actions">
              <ThemeToggle />
              <span className="free-tag">100% Free</span>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="footer">
            <p>© 2026 JSON Toolbox. Free tools for developers.</p>

            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
