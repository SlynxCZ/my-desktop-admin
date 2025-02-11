// components/DatabaseConnectForm.tsx
import {useState} from 'react';
import axios from 'axios';

const DatabaseConnectForm = () => {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/connect-db', {
        host,
        user,
        password,
      });
      setMessage(response.data.message);
    } catch (e) {
      // @ts-ignore
      setMessage('Failed to connect: ' + e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <h2 className="text-white text-lg mb-4">Connect to Database</h2>
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
        <button type="submit" className="w-full p-2 bg-blue-500 rounded mt-4">
          Connect
        </button>
      </form>
      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
};

export default DatabaseConnectForm;
