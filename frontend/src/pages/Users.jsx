import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/main.scss';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchUsers = async () => {
        try {
            const res = await API.get('/users');
            setUsers(res.data);
        } catch {
            toast.error('Failed to fetch users.');
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editingUser) {
                await API.put(`/users/${editingUser.id}`, data);
                toast.success('User updated.');
                setEditingUser(null);
            } else {
                await API.post('/users', data);
                toast.success('New user added.');
            }
            fetchUsers();
            reset();
        } catch {
            toast.error('An error occurred.');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setValue('name', user.name);
        setValue('email', user.email);
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/users/${id}`);
            toast.success('User deleted.');
            fetchUsers();
        } catch {
            toast.error('Failed to delete user.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <h2>
                {editingUser
                    ? 'Edit User'
                    : 'Add New User'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    required
                />

                <button type="submit">
                    {editingUser ? 'Save' : 'Add'}
                </button>

                {editingUser && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingUser(null);
                            reset();
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        <span>
                            {u.name} ({u.email})
                        </span>
                        <span>
                            <button onClick={() => handleEdit(u)}>✏️</button>
                            <button onClick={() => handleDelete(u.id)}>
                                🗑
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
