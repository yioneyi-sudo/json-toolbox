
"use client";

import { useState} from "react";

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

  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    // 只允许 JSON 文件
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

    // 允许用户再次选择同一个文件
    event.target.value = "";
  }
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

        // 从浏览器错误信息中提取错误字符的位置
        const match = errorMessage.match(/position\s+(\d+)/i);

        if (match) {
          const position = Number(match[1]);

          // 计算行号和列号
          const textBeforeError = input.slice(0, position);
          const lines = textBeforeError.split("\n");

          const line = lines.length;
          const column = lines[lines.length - 1].length + 1;

          setErrorLocation(
            `Line ${line}, Column ${column}`
          );
        } else {
          setErrorLocation(
            "Exact position is unavailable in this browser."
          );
        }
      }
  }

  async function copyOutput() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setMessage("Copied to clipboard!");
    } catch {
      setError("Unable to copy. Please copy the text manually.");
    }
  }

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
    setMessage("");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setErrorLocation("");
    setMessage("");
    setFileName("");
    setActiveMode("");
}
  
function downloadJson() {
    if (!output) return;

    const blob = new Blob([output], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // 获取原始文件名
    const originalName = fileName
      ? fileName.replace(/\.json$/i, "")
      : "json";

    // 根据当前操作确定下载文件名
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
      {/* <header className="header">
        <div className="logo">
          <a href="/" className="logo-link">
            <span className="logo-icon">{"{ }"}</span>
            JSON Toolbox
          </a>
        </div>

        <nav className="main-nav">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="actions">
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <span className="free-tag">100% Free</span>
        </div>
      </header> */}

      <section className="hero">
        <span className="eyebrow">FREE DEVELOPER TOOL</span>

        <h1>Free Online JSON Formatter & Validator</h1>

        <p>
          Format, validate and minify JSON online.
          Fast, simple and secure.
          Your data stays in your browser.
        </p>
      </section>

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

          <div className="panel">
            <div className="panel-header">
              <h2>Output</h2>

              <div className="actions">
                <button onClick={copyOutput}>Copy</button>
                <button onClick={downloadJson}>Download</button>
              </div>
            </div>

            <pre>
              {output || "Your result will appear here..."}
            </pre>
          </div>
        </div>

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

        {message && (
          <div className="success">
            {message}
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why use JSON Toolbox?</h2>

        <div className="feature-grid">
          <div className="feature">
            <h3>⚡ Fast & Free</h3>
            <p>Format and validate JSON instantly.</p>
          </div>

          <div className="feature">
            <h3>🔒 Privacy First</h3>
            <p>Your JSON data stays in your browser.</p>
          </div>

          <div className="feature">
            <h3>🛠 Easy to Use</h3>
            <p>Simple tools for everyday development.</p>
          </div>
        </div>
      </section>

      <section className="seo-content">
        <h2>Free Online JSON Tools</h2>

        <p>
          JSON Toolbox is a free online tool for developers
          who need to format, validate, and minify JSON data.
          No installation or registration is required.
        </p>

        <h3>What is a JSON Formatter?</h3>

        <p>
          A JSON formatter makes JSON data easier to read by
          adding proper indentation and line breaks.
          It helps developers inspect complex JSON structures
          and debug their applications.
        </p>

        <h3>What is JSON Validation?</h3>

        <p>
          JSON validation checks whether your data follows
          the correct JSON syntax. JSON Toolbox helps identify
          syntax errors and shows error locations when available.
        </p>

        <h3>What is JSON Minification?</h3>

        <p>
          JSON minification removes unnecessary whitespace
          from JSON data, making the output smaller and more
          compact.
        </p>

        <h3>Is JSON Toolbox Safe to Use?</h3>

        <p>
          Your JSON data is processed directly in your browser.
          The tool does not need to upload your JSON content
          to a server for formatting or validation.
        </p>
      </section>
    </main>
  );
}
