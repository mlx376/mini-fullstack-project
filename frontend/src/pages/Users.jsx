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
        <div className="container" role="main">
            <ToastContainer />

            <aside className="warning-alert" role="alert">
                ⚠️ This application depends on a locally running backend API (usually at{' '}
                <code>https://axmadvsss.github.io/mini-fullstack-project/</code>). If the backend is offline,
                user operations (fetch, add, update, delete) will not work. This is expected behavior.
            </aside>

            <section className="user-management">
                <header className="form-header">
                    <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="user-form">
                    <input
                        type="text"
                        placeholder="Enter name"
                        {...register('name')}
                        required
                        aria-label="Name"
                    />
                    <input
                        type="email"
                        placeholder="Enter email"
                        {...register('email')}
                        required
                        aria-label="Email"
                    />

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {editingUser ? 'Update' : 'Add'}
                        </button>

                        {editingUser && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setEditingUser(null);
                                    reset();
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <ul className="user-list">
                    {users.map((u) => (
                        <li key={u.id} className="user-item">
                            <div className="user-info">
                                <strong>{u.name}</strong> <span className="user-email">({u.email})</span>
                            </div>
                            <div className="user-actions">
                                <button
                                    onClick={() => handleEdit(u)}
                                    aria-label={`Edit ${u.name}`}
                                    title={`Edit ${u.name}`}
                                    className="edit-btn"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(u.id)}
                                    aria-label={`Delete ${u.name}`}
                                    title={`Delete ${u.name}`}
                                    className="delete-btn"
                                >
                                    🗑
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
