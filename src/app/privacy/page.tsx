
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | JSON Toolbox",
  description:
    "Learn how JSON Toolbox processes JSON data locally and uses privacy-focused website analytics.",
};

export default function PrivacyPage() {
  return (
    <main className="content-page">
      <h1>Privacy Policy</h1>

      <p>Last updated: November 6, 2026</p>

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
        not uploaded to our servers for processing.
      </p>

      <p>
        When you upload a JSON file, the file is read
        locally by your browser. We do not upload the
        file to our servers. Downloaded files are also
        generated directly in your browser.
      </p>

      <h2>2. Information We Collect</h2>

      <p>
        You do not need to create an account or provide
        personal information to use the core JSON tools.
      </p>

      <p>
        We use Cloudflare Web Analytics to understand
        general website usage, including page views,
        visits, and website performance.
      </p>

      <p>
        According to Cloudflare, its Web Analytics
        service does not use cookies or browser storage
        to track individual visitors and does not use
        fingerprinting for analytics purposes.
      </p>

      <h2>3. Cookies and Local Storage</h2>

      <p>
        Our core JSON tools do not require cookies
        to process your JSON data.
      </p>

      <p>
        We use browser local storage to remember your
        preferred display theme, such as dark mode or
        light mode. This preference is stored locally
        in your browser.
      </p>

      <p>
        Cloudflare Web Analytics does not use cookies
        or local storage for its analytics metrics.
      </p>

      <h2>4. Third-Party Services</h2>

      <p>
        Our website uses Cloudflare Web Analytics.
        This service is provided by Cloudflare and
        helps us understand general website traffic
        and performance.
      </p>

      <p>
        Our website may also contain links to
        third-party websites. We are not responsible
        for their privacy practices or content.
        Please review their privacy policies when
        visiting those websites.
      </p>

      <h2>5. Data Security</h2>

      <p>
        Processing JSON locally in your browser helps
        reduce the need to transmit your JSON content
        over the internet.
      </p>

      <p>
        However, no method of internet transmission
        or electronic storage is completely secure.
      </p>

      <h2>6. Policy Updates</h2>

      <p>
        We may update this Privacy Policy as our
        website and services evolve. Any changes
        will be posted on this page with an updated
        revision date.
      </p>

      <h2>7. Contact</h2>

      <p>
        If you have questions about this Privacy Policy,
        please contact us at{" "}
        <a href="mailto:zjy15827189621@gmail.com">
          zjy15827189621@gmail.com
        </a>.
      </p>
    </main>
  );
}
