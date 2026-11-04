import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | JSON Toolbox",
  description:
    "Contact JSON Toolbox with questions, suggestions, bug reports, or feedback about our free developer tools.",
};
export default function ContactPage() {
  return (
    <main className="content-page">
      <h1>Contact Us</h1>

      <p>
        Have a question, suggestion, or feedback
        about JSON Toolbox?
        We would love to hear from you.
      </p>

      <h2>Feedback and Suggestions</h2>

      <p>
        We are continuously working to improve
        our developer tools. Your feedback helps
        us make JSON Toolbox better.
      </p>

      <h2>Get in Touch</h2>

      <p>
        For questions, bug reports, or business
        inquiries, please contact us at:
      </p>

      <p>
        <strong>zjy15827189621@gmail.com</strong>
      </p>

      <p>
        We aim to respond to inquiries as soon
        as possible.
      </p>
    </main>
  );
}
