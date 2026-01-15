import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!newTitle) return;
    try {
      const res = await api.post("/tasks", {
        title: newTitle,
        description: newDescription,
      });
      setTasks([...tasks, res.data]);
      setNewTitle("");
      setNewDescription("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const toggleCompleted = async (task: Task) => {
    try {
      const res = await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button
  onClick={() => {
    logout();
    navigate('/login');
  }}
>
  Logout
</button>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

        {/* Create Task */}
        <div className="mb-6">
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button
            onClick={createTask}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add Task
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task)}
                />
                <div>
                  <p
                    className={`font-medium ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {task.description || "No description"}
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
