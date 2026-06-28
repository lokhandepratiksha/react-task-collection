import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// ── existing users data (in-memory for now) ──────────────────────
let users = [
  { id: 1, name: 'Priya Sharma',   email: 'priya@example.com',  status: 'active'   },
  { id: 2, name: 'Rahul Mehta',    email: 'rahul@example.com',  status: 'inactive' },
  { id: 3, name: 'Anjali Singh',   email: 'anjali@example.com', status: 'pending'  },
  { id: 4, name: 'Karan Patel',    email: 'karan@example.com',  status: 'active'   },
  { id: 5, name: 'Sneha Reddy',    email: 'sneha@example.com',  status: 'rejected' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// PATCH update a user's status
app.patch('/api/users/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ['active', 'inactive', 'rejected', 'pending'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const user = users.find(u => u.id === Number(id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.status = status;
  res.json(user);
});

// ... your existing /api/products route stays here
app.listen(port, () => console.log(`Server running on port ${port}`));