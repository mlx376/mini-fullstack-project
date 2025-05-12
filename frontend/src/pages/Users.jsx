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

    // Barcha foydalanuvchilarni olish
    const fetchUsers = async () => {
        try {
            const res = await API.get('/users');
            setUsers(res.data);
        } catch {
            toast.error('❌ Foydalanuvchilarni olishda xatolik.');
        }
    };

    // Foydalanuvchi qo‘shish yoki tahrirlash
    const onSubmit = async (data) => {
        try {
            if (editingUser) {
                await API.put(`/users/${editingUser.id}`, data);
                toast.success('✅ Foydalanuvchi yangilandi.');
                setEditingUser(null);
            } else {
                await API.post('/users', data);
                toast.success('✅ Yangi foydalanuvchi qo‘shildi.');
            }
            fetchUsers();
            reset();
        } catch {
            toast.error('❌ Xatolik yuz berdi.');
        }
    };

    // Tahrirlash uchun tanlash
    const handleEdit = (user) => {
        setEditingUser(user);
        setValue('name', user.name);
        setValue('email', user.email);
    };

    // O‘chirish
    const handleDelete = async (id) => {
        try {
            await API.delete(`/users/${id}`);
            toast.success('🗑 Foydalanuvchi o‘chirildi.');
            fetchUsers();
        } catch {
            toast.error('❌ O‘chirishda xatolik.');
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
                    ? 'Foydalanuvchini tahrirlash'
                    : 'Yangi foydalanuvchi qo‘shish'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Ism"
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
                    {editingUser ? 'Saqlash' : 'Qo‘shish'}
                </button>

                {editingUser && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingUser(null);
                            reset();
                        }}
                    >
                        Bekor qilish
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
