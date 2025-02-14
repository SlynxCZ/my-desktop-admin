/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "@/utils/SessionContext";
import {useHeader} from "@/utils/HeaderContext";
import {useDynamicComponent} from "@/utils/DynamicComponent";
import DatabaseConnectForm from "@/components/DatabaseConnectForm";

interface QueryResult {
  [key: string]: any;
}

const QueryExecutor = () => {
  const [query, setQuery] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState<number>(200); // Výchozí výška

  const { setActiveText } = useHeader();
  const { session } = useSession();
  const { setActiveComponent } = useDynamicComponent();

  useEffect(() => {
    const checkForSession = () => {
      if (!session?.user)
        setActiveComponent(<DatabaseConnectForm />);
    }

    checkForSession();
  }, [session]);

  // 🔹 Dynamická úprava výšky textarea podle velikosti okna
  useEffect(() => {
    const updateHeight = () => {
      if (!output) return; // Pokud není output, nezměníme výšku

      const availableHeight = window.innerHeight - 350; // Odečteme výšku ostatních prvků
      setTextareaHeight(Math.max(200, availableHeight)); // Minimální výška 200px
    };

    window.addEventListener("resize", updateHeight);
    updateHeight(); // Spustíme jednou při načtení

    return () => window.removeEventListener("resize", updateHeight);
  }, [output]); // Sledujeme `output`, aby se výška upravila pouze pokud existuje

  useEffect(() => {
    setActiveText("Query Executor");
  }, [setActiveText]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput(null);

    try {
      const response = await axios.post<{ data: QueryResult[] }>("/api/execute_query", {
        host: session?.host,
        user: session?.user,
        password: session?.password,
        query,
      });

      setOutput(JSON.stringify(response.data.data, null, 2));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError("Error: " + (err.response?.data?.message || err.message));
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-800 rounded-md w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white text-lg mb-2">Enter SQL Query:</label>
          <textarea
            value={query}
            onChange={handleQueryChange}
            rows={6}
            className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
            placeholder="Enter your SQL query here..."
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 rounded text-white mt-4" disabled={loading}>
          {loading ? "Executing..." : "Execute"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {output && (
        <div className="mt-4 flex flex-col flex-grow">
          <h3 className="text-white text-lg mb-2">Query Output:</h3>
          <textarea
            value={output}
            readOnly
            className="w-full max-w-full p-2 bg-gray-700 text-white rounded resize-none flex-grow max-h-80"
            style={{ height: `${textareaHeight}px`, minHeight: "200px" }}
            wrap="soft"
          />
        </div>
      )}
    </div>
  );
};

export default QueryExecutor;
