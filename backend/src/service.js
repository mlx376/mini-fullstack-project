const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET /users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// POST /users
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
    });
    res.json(user);
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({
        where: { id: Number(id) },
    });
    res.json({ message: 'Deleted' });
});

// Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
