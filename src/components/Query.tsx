import React, {useState} from "react";
import axios from "axios";
import {useSession} from "@/utils/SessionContext";

interface QueryResult {
  [key: string]: any; // Pokud výsledek obsahuje dynamická data (např. z SQL)
}

const QueryExecutor = () => {
  const [query, setQuery] = useState<string>("");
  const [output, setOutput] = useState<QueryResult[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { session } = useSession();

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
      setOutput(response.data.data);
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
    <div className="p-4 bg-gray-800 rounded-md">
      <h2 className="text-white text-lg mb-4">Execute SQL Query</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white">Enter SQL Query:</label>
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
          {loading ? "Executing..." : "Execute Query"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {output && (
        <div className="mt-4">
          <h3 className="text-white text-lg">Query Output:</h3>
          <pre className="p-2 mt-2 bg-gray-700 rounded text-white">{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryExecutor;
