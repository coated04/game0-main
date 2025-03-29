import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function UserListComponent() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        if (!token || role !== 'ADMIN') {
            toast.error('Access denied');
            navigate('/');
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const filteredUsers = response.data.filter(user => user.id !== 1);

                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to load users');
            }
        };

        fetchUsers();
    }, [navigate]);

    const promoteUser = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.patch(`http://localhost:8080/api/v1/users/${id}/role`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`User promoted to superuser: ${response.data.email}`);

            setUsers(users.map(user => (user.id === id ? response.data : user)));
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to promote user');
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:8080/api/v1/users/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('User deleted successfully');

            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to delete user');
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <Link to="/gamescrud"> Go back</Link>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.email} - Role: {user.role}

                        {user.role !== 'ADMIN' && user.role !== 'SUPERUSER' && (
                            <button onClick={() => promoteUser(user.id)}>Promote to superuser</button>
                        )}

                        <button onClick={() => deleteUser(user.id)}>Delete User</button>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
}

export default UserListComponent;
