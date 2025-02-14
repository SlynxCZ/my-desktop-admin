import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHeader} from "@/utils/HeaderContext";
import {useSession} from "@/utils/SessionContext";
import {useDynamicComponent} from "@/utils/DynamicComponent";
import QueryExecutor from "@/components/Query";

const DatabaseConnectForm = () => {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [saveCredentials, setSaveCredentials] = useState(false);

  const { setActiveText } = useHeader();
  const { session, writeSession } = useSession();
  const { setActiveComponent } = useDynamicComponent();

  useEffect(() => {
    if (session?.user) {
      setActiveComponent(<QueryExecutor />);
    }
  }, [session]);

  useEffect(() => {
    setActiveText("Server Connector");
  }, [setActiveText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/connect_schema', {
        host,
        user,
        password,
      });

      if (saveCredentials)
        await writeSession(host, user, password, true);
      else
        await writeSession(host, user, password, false);

      setMessage(response.data.message);
    } catch (e) {
      setMessage('Failed to connect: ' + e);
    }

    setActiveComponent(<QueryExecutor />);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <h2 className="text-white text-lg mb-4">Connect to Schema</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white">Host:</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full p-2 mt-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-white">User:</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 mt-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-white">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 rounded"
              required
            />
          </div>
          <div className="mt-4">
            <label className="text-white">
              <input
                type="checkbox"
                checked={saveCredentials}
                onChange={(e) => setSaveCredentials(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 rounded mt-4 text-white">
            Connect
          </button>
        </form>

      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
};

export default DatabaseConnectForm;
