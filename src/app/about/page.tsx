import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | JSON Toolbox",
  description:
    "Learn about JSON Toolbox, a free online toolkit for formatting, validating, and minifying JSON data.",
};
export default function AboutPage() {
  return (
    <main className="content-page">
      <h1>About JSON Toolbox</h1>

      <p>
        Welcome to JSON Toolbox, a free online toolkit
        designed to make working with JSON data easier
        for developers.
      </p>

      <h2>Our Mission</h2>

      <p>
        Our mission is to provide simple, fast, and
        accessible developer tools that help people
        work more efficiently.
      </p>

      <h2>What We Offer</h2>

      <ul>
        <li>JSON formatting and beautification</li>
        <li>JSON validation and error detection</li>
        <li>JSON minification</li>
        <li>Local JSON file upload and download</li>
      </ul>

      <h2>Privacy First</h2>

      <p>
        JSON formatting and validation are processed
        directly in your browser. Your JSON content
        does not need to be uploaded to our servers.
      </p>

      <h2>Our Commitment</h2>

      <p>
        We aim to keep our tools free, easy to use,
        and useful for developers around the world.
      </p>
    </main>
  );
}
