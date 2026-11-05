"use client";

import { useState, type ChangeEvent } from "react";

export default function Home() {
  const [input, setInput] = useState(
    '{\n  "name": "JSON Toolbox",\n  "type": "Developer Tool",\n  "free": true\n}'
  );

  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [message, setMessage] = useState("");
  const [activeMode, setActiveMode] = useState<
    "format" | "minify" | "validate" | ""
  >("");
  const [fileName, setFileName] = useState("");

  // Upload a JSON file and read it locally in the browser.
  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      !file.name.toLowerCase().endsWith(".json") &&
      file.type !== "application/json"
    ) {
      setError("Please upload a valid JSON file.");
      setErrorLocation("");
      setMessage("");
      event.target.value = "";
      return;
    }

    try {
      const content = await file.text();

      setInput(content);
      setOutput("");
      setError("");
      setErrorLocation("");
      setActiveMode("");
      setFileName(file.name);
      setMessage(`File "${file.name}" loaded successfully!`);
    } catch {
      setError("Unable to read this file. Please try again.");
      setErrorLocation("");
      setMessage("");
    }

    // Allow the user to select the same file again.
    event.target.value = "";
  }

  // Format, minify, or validate JSON.
  function processJson(mode: "format" | "minify" | "validate") {
    setActiveMode(mode);

    try {
      const parsed = JSON.parse(input);

      if (mode === "format") {
        setOutput(JSON.stringify(parsed, null, 2));
        setMessage("JSON formatted successfully!");
      }

      if (mode === "minify") {
        setOutput(JSON.stringify(parsed));
        setMessage("JSON minified successfully!");
      }

      if (mode === "validate") {
        setOutput(JSON.stringify(parsed, null, 2));
        setMessage("Valid JSON! Your data is correctly formatted.");
      }

      setError("");
      setErrorLocation("");
    } catch (err) {
      setOutput("");
      setMessage("");

      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid JSON. Please check your input.";

      setError(errorMessage);

      // Try to extract the error position from the browser error.
      const match = errorMessage.match(/position\s+(\d+)/i);

      if (match) {
        const position = Number(match[1]);
        const textBeforeError = input.slice(0, position);
        const lines = textBeforeError.split("\n");

        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;

        setErrorLocation(`Line ${line}, Column ${column}`);
      } else {
        setErrorLocation(
          "Exact position is unavailable in this browser."
        );
      }
    }
  }

  // Copy the output to the clipboard.
  async function copyOutput() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setMessage("Copied to clipboard!");
    } catch {
      setError("Unable to copy. Please copy the text manually.");
    }
  }

  // Load a sample JSON object.
  function loadExample() {
    setInput(
      JSON.stringify(
        {
          user: {
            name: "John Doe",
            email: "john@example.com",
            active: true,
          },
          settings: {
            theme: "dark",
            notifications: true,
          },
          tags: ["developer", "json", "tools"],
        },
        null,
        2
      )
    );

    setOutput("");
    setError("");
    setErrorLocation("");
    setMessage("");
    setActiveMode("");
    setFileName("");
  }

  // Clear the input and output.
  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setErrorLocation("");
    setMessage("");
    setFileName("");
    setActiveMode("");
  }

  // Download the result as a JSON file.
  function downloadJson() {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const originalName = fileName
      ? fileName.replace(/\.json$/i, "")
      : "json";

    let suffix = "formatted";

    if (activeMode === "minify") {
      suffix = "minified";
    } else if (activeMode === "validate") {
      suffix = "validated";
    }

    link.href = url;
    link.download = `${originalName}-${suffix}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <main className="container">
      {/* Hero */}
      <section className="hero">
        <span className="eyebrow">FREE DEVELOPER TOOL</span>

        <h1>Free Online JSON Formatter &amp; Validator</h1>

        <p>
          Format, validate, and minify JSON online with a free and easy-to-use
          tool. Upload JSON files, fix syntax errors, and download your
          formatted results in seconds. No installation or registration
          required. Your JSON content is processed directly in your browser.
        </p>
      </section>

      {/* JSON Tool */}
      <section className="tool">
        <div className="toolbar">
          <div className="actions">
            <button
              onClick={() => processJson("format")}
              className={activeMode === "format" ? "active" : ""}
            >
              Format
            </button>

            <button
              onClick={() => processJson("minify")}
              className={activeMode === "minify" ? "active" : ""}
            >
              Minify
            </button>

            <button
              onClick={() => processJson("validate")}
              className={activeMode === "validate" ? "active" : ""}
            >
              Validate
            </button>
          </div>

          <div className="actions secondary-actions">
            <label className="upload-button">
              <span>↑ Upload JSON</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
              />
            </label>

            <button onClick={loadExample}>Example</button>
            <button onClick={clearAll}>Clear</button>
          </div>
        </div>

        <div className="editors">
          {/* Input Panel */}
          <div className="panel">
            <div className="panel-header">
              <h2>Input JSON</h2>
              <span>{input.length} characters</span>
            </div>

            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
                setErrorLocation("");
                setMessage("");
                setActiveMode("");
              }}
              placeholder="Paste your JSON here..."
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="panel">
            <div className="panel-header">
              <h2>Output</h2>

              <div className="actions">
                <button onClick={copyOutput}>Copy</button>
                <button onClick={downloadJson}>Download</button>
              </div>
            </div>

            <pre>{output || "Your result will appear here..."}</pre>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error">
            <strong>Invalid JSON</strong>

            <p>{error}</p>

            {errorLocation && (
              <p>
                <strong>Error Location: </strong>
                {errorLocation}
              </p>
            )}

            <p>
              Please check the JSON syntax near the reported position.
            </p>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="success">
            {message}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Use JSON Toolbox?</h2>

        <div className="feature-grid">
          <div className="feature">
            <h3>⚡ Fast &amp; Free</h3>
            <p>
              Format, minify, and validate JSON instantly. No signup,
              installation, or payment required.
            </p>
          </div>

          <div className="feature">
            <h3>🔒 Privacy First</h3>
            <p>
              JSON processing happens directly in your browser. This tool
              does not upload your JSON content to our server.
            </p>
          </div>

          <div className="feature">
            <h3>🛠 Easy to Use</h3>
            <p>
              A simple online JSON tool for developers, students, and anyone
              working with structured data.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="seo-content">
        <h2>Free Online JSON Tools</h2>

        <p>
          JSON Toolbox is a free online JSON formatter, validator, and
          minifier. It helps developers make JSON data easier to read,
          check JSON syntax, and reduce unnecessary whitespace. Whether you
          are debugging an API response, editing a configuration file, or
          working with structured data, you can use these tools directly
          in your browser.
        </p>

        <h3>What Is a JSON Formatter?</h3>

        <p>
          A JSON formatter makes JSON data easier to read by adding proper
          indentation and line breaks. It converts compact or hard-to-read
          JSON into a structured format, helping developers inspect objects,
          arrays, and nested data. Paste your JSON into the input panel and
          click the Format button to get a neatly formatted result.
        </p>

        <h3>What Is JSON Validation?</h3>

        <p>
          JSON validation checks whether your data follows the correct JSON
          syntax. Invalid JSON may contain missing commas, unmatched brackets,
          incorrect quotation marks, or other syntax errors. Use the
          Validate button to check your JSON. When an error is detected,
          JSON Toolbox displays the browser&apos;s error message and an
          approximate error location when available.
        </p>

        <h3>What Is JSON Minification?</h3>

        <p>
          JSON minification removes unnecessary spaces, indentation, and
          line breaks from JSON data. The result is a more compact JSON
          string that can be useful when reducing the size of data sent
          between applications or APIs. Paste your JSON and click Minify
          to create a compact version.
        </p>

        <h3>Format and Validate JSON Files Online</h3>

        <p>
          You can work with JSON files without manually copying their
          contents. Click Upload JSON to select a .json file from your
          device. After processing the content, use the Download button
          to save the result as a new JSON file. The original file is not
          overwritten.
        </p>

        <p>
          The file is read by your browser, and the JSON formatting,
          validation, and minification operations run locally in the
          browser. This tool does not need to upload your JSON content
          to a server to process it.
        </p>

        <h3>How to Use JSON Toolbox</h3>

        <p>
          Using this online JSON tool takes only a few steps:
        </p>

        <ol>
          <li>
            <strong>Enter your JSON:</strong> Paste JSON data into the
            input panel, or click Upload JSON to choose a file.
          </li>
          <li>
            <strong>Choose an operation:</strong> Click Format to make
            JSON readable, Minify to remove extra whitespace, or Validate
            to check its syntax.
          </li>
          <li>
            <strong>Review the result:</strong> Your processed JSON will
            appear in the output panel.
          </li>
          <li>
            <strong>Copy or download:</strong> Click Copy to copy the
            result, or Download to save it as a JSON file.
          </li>
        </ol>

        <h3>Is JSON Toolbox Safe to Use?</h3>

        <p>
          JSON Toolbox processes JSON content directly in your browser.
          The formatting, minification, and validation operations do not
          require your JSON content to be uploaded to our server. For
          highly sensitive information, you should still follow your
          organization&apos;s data-handling policies and avoid using
          untrusted websites.
        </p>
      </section>

      {/* FAQ */}
      <section className="seo-content">
        <h2>Frequently Asked Questions</h2>

        <h3>Is JSON Toolbox free?</h3>
        <p>
          Yes. JSON Toolbox is free to use. You do not need to create
          an account or install any software.
        </p>

        <h3>Can I format JSON online?</h3>
        <p>
          Yes. Paste your JSON into the input panel and click Format.
          The tool will add indentation and line breaks to make the
          JSON easier to read.
        </p>

        <h3>Can I validate JSON syntax?</h3>
        <p>
          Yes. Click Validate to check whether your input contains
          valid JSON syntax. If the JSON is invalid, an error message
          will be displayed.
        </p>

        <h3>Can I minify JSON?</h3>
        <p>
          Yes. Click Minify to remove unnecessary whitespace and
          create a compact JSON string.
        </p>

        <h3>Can I upload and download JSON files?</h3>
        <p>
          Yes. You can upload a .json file from your device and
          download the processed result. Your original file will
          not be overwritten.
        </p>

        <h3>Is my JSON data uploaded to a server?</h3>
        <p>
          No. The JSON processing operations in this tool run directly
          in your browser. Your JSON content is not uploaded to our
          server for formatting, validation, or minification.
        </p>
      </section>
    </main>
  );
}