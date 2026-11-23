
"use client";

import { useRef, useState } from "react";

type FlatObject = Record<string, string | number | boolean>;

const sampleJson = `[
  {
    "name": "Alice",
    "age": 25,
    "address": {
      "city": "New York",
      "country": "USA"
    }
  },
  {
    "name": "Bob",
    "age": 30,
    "address": {
      "city": "London",
      "country": "UK"
    }
  }
]`;

function flattenObject(
  value: unknown,
  prefix = "",
  result: FlatObject = {}
): FlatObject {
  if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    const object = value as Record<string, unknown>;

    for (const key of Object.keys(object)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      flattenObject(object[key], newKey, result);
    }

    return result;
  }

  if (Array.isArray(value)) {
    result[prefix] = JSON.stringify(value);
    return result;
  }

  if (prefix) {
    result[prefix] =
      value === null || value === undefined
        ? ""
        : (value as string | number | boolean);
  }

  return result;
}

function escapeCsvValue(value: unknown): string {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function convertJsonToCsv(input: string): string {
  const parsed: unknown = JSON.parse(input);

  if (!Array.isArray(parsed)) {
    throw new Error(
      "Your JSON must contain an array of objects."
    );
  }

  if (parsed.length === 0) {
    throw new Error("Your JSON array is empty.");
  }

  if (
    !parsed.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        !Array.isArray(item)
    )
  ) {
    throw new Error(
      "Every item in the JSON array must be an object."
    );
  }

  const rows = parsed.map((item) => flattenObject(item));

  const headers = Array.from(
    new Set(rows.flatMap((row) => Object.keys(row)))
  );

  if (headers.length === 0) {
    throw new Error(
      "No data fields were found in your JSON."
    );
  }

  const headerRow = headers
    .map(escapeCsvValue)
    .join(",");

  const dataRows = rows.map((row) =>
    headers
      .map((header) => escapeCsvValue(row[header] ?? ""))
      .join(",")
  );

  return [headerRow, ...dataRows].join("\r\n");
}

export default function JsonToCsvPage() {
  const [input, setInput] = useState(sampleJson);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  
    function handleConvert() {
    setError("");
    setMessage("");
    setOutput("");

    // Check whether the input is empty
    if (!input.trim()) {
        setError("Please enter JSON data or upload a JSON file.");
        return;
    }

    try {
        const csv = convertJsonToCsv(input);
        setOutput(csv);
        setMessage("JSON successfully converted to CSV.");
    } catch (err) {
        setError(
        err instanceof Error
            ? err.message
            : "Unable to convert JSON."
        );
    }
    }


  function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please upload a .json file.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const content = String(reader.result ?? "");

      setInput(content);
      setOutput("");
      setError("");
      setMessage(`Loaded ${file.name}`);
    };

    reader.onerror = () => {
      setError("Unable to read this file.");
    };

    reader.readAsText(file);
    event.target.value = "";
  }

  async function handleCopy() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setMessage("CSV copied to clipboard.");
      setError("");
    } catch {
      setError(
        "Unable to copy. Please copy the output manually."
      );
    }
  }

  function handleDownload() {
    if (!output) return;

    const blob = new Blob(["\uFEFF", output], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "converted.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
    setMessage("");
  }

  return (
    <main className="json-csv-page">
      {/* Page heading */}
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          JSON to CSV Converter
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Convert JSON to CSV online for free. Paste your
          data or upload a JSON file, then download your
          converted CSV.
        </p>

        <div className="json-csv-badges">
        <span>Free to use</span>
        <span>No sign-up</span>
        <span>Browser-based</span>
        </div>
      </header>

      {/* Input card */}
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Input JSON
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Paste a JSON array of objects below.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="!rounded-lg !border !border-slate-300 !bg-white !px-4 !py-2 !text-sm !font-medium !text-slate-700 hover:!bg-slate-100 dark:!border-slate-600 dark:!bg-slate-800 dark:!text-slate-200 dark:hover:!bg-slate-700"
            >
              Upload JSON
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleUpload}
              style={{ display: "none" }}
            />

            <button
              type="button"
              onClick={handleClear}
              className="!rounded-lg !border !border-slate-300 !bg-white !px-4 !py-2 !text-sm !font-medium !text-slate-700 hover:!bg-slate-100 dark:!border-slate-600 dark:!bg-slate-800 dark:!text-slate-200 dark:hover:!bg-slate-700"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setError("");
            setMessage("");
          }}
          spellCheck={false}
          placeholder="Paste your JSON here..."
          className="min-h-[300px] w-full resize-y rounded-xl !border !border-slate-300 !bg-slate-50 p-4 font-mono text-sm leading-6 !text-slate-900 outline-none focus:!border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:!border-slate-700 dark:!bg-slate-950 dark:!text-slate-100"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Supports nested JSON objects</span>
          <span>Your data stays in your browser</span>
        </div>
      </section>

      {/* Convert button */}
      <button
        type="button"
        onClick={handleConvert}
        className="mb-6 w-full !rounded-xl !border-0 !bg-blue-600 !px-6 !py-3.5 !text-base !font-semibold !text-white shadow-sm transition hover:!bg-blue-700"
      >
        Convert to CSV
      </button>

      {/* Error and success messages */}
      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {message && !error && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
        >
          {message}
        </div>
      )}

      {/* Output card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              CSV Output
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your converted CSV will appear here.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="!rounded-lg !border !border-slate-300 !bg-white !px-4 !py-2 !text-sm !font-medium !text-slate-700 hover:!bg-slate-100 disabled:!cursor-not-allowed disabled:!opacity-40 dark:!border-slate-600 dark:!bg-slate-800 dark:!text-slate-200 dark:hover:!bg-slate-700"
            >
              Copy CSV
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={!output}
              className="!rounded-lg !border-0 !bg-green-600 !px-4 !py-2 !text-sm !font-medium !text-white hover:!bg-green-700 disabled:!cursor-not-allowed disabled:!opacity-40"
            >
              Download CSV
            </button>
          </div>
        </div>

        <textarea
          value={output}
          readOnly
          spellCheck={false}
          placeholder="Your converted CSV will appear here..."
          className="min-h-[240px] w-full resize-y rounded-xl !border !border-slate-300 !bg-slate-50 p-4 font-mono text-sm leading-6 !text-slate-900 dark:!border-slate-700 dark:!bg-slate-950 dark:!text-slate-100"
        />
      </section>

      {/* Instructions */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
          How to convert JSON to CSV
        </h2>

        <ol className="list-inside list-decimal space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li>Paste your JSON data or upload a JSON file.</li>
          <li>Click Convert to CSV.</li>
          <li>Copy the result or download it as a CSV file.</li>
        </ol>

        <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
          This tool processes your data locally in your
          browser. Your JSON file is not uploaded to a server.
        </p>
      </section>
    </main>
  );
}
