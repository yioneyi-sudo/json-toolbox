import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | JSON Toolbox",
  description:
    "Read the JSON Toolbox privacy policy and learn how your JSON data is processed locally in your browser.",
};
export default function PrivacyPage() {
  return (
    <main className="content-page">
      <h1>Privacy Policy</h1>

      <p>Last updated: November 3, 2026</p>

      <p>
        Your privacy matters to us. This Privacy Policy
        explains how JSON Toolbox handles information
        when you use our website.
      </p>

      <h2>1. JSON Data Processing</h2>

      <p>
        JSON formatting, validation, and minification
        are performed locally in your browser.
        JSON content processed by these features is
        not uploaded to our servers.
      </p>

      <h2>2. Information We Collect</h2>

      <p>
        We do not require users to create an account
        or provide personal information to use the
        core JSON tools.
      </p>

      <p>
        If we introduce analytics, advertising, or
        other third-party services in the future,
        this policy will be updated to explain what
        information those services may collect.
      </p>

      <h2>3. Cookies</h2>

      <p>
        Our current core JSON tools do not require
        cookies to process your JSON data.
        Third-party services, if added, may use
        cookies or similar technologies.
      </p>

      <h2>4. Third-Party Services</h2>

      <p>
        Our website may link to third-party websites.
        We are not responsible for their privacy
        practices or content.
      </p>

      <h2>5. Data Security</h2>

      <p>
        Processing JSON locally in your browser helps
        reduce the need to transmit your JSON content
        over the internet.
      </p>

      <h2>6. Policy Updates</h2>

      <p>
        We may update this Privacy Policy as our
        website and services evolve.
      </p>

      <h2>7. Contact</h2>

      <p>
        If you have questions about this Privacy Policy,
        please visit our Contact page.
      </p>
    </main>
  );
}
