
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/users`).then(res => setUsers(res.data));
  }, []);

  const trigger = (type) => {
    axios.post(`${API}/api/events`, { type, userId: selected });
  };

  const fetchNotifications = () => {
    axios.get(`${API}/api/notifications/${selected}`).then(res => setNotifications(res.data));
  };

  return (
    <div>
      <h1>Insyd Notifications</h1>
      <select onChange={e => setSelected(e.target.value)}>
        <option>Select user</option>
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
      <div>
        <button onClick={() => trigger("like")}>Like</button>
        <button onClick={() => trigger("comment")}>Comment</button>
        <button onClick={fetchNotifications}>Get Notifications</button>
      </div>
      <ul>
        {notifications.map(n => <li key={n._id}>{n.message}</li>)}
      </ul>
    </div>
  )
}
export default App;
