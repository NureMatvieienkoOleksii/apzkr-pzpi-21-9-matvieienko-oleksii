import React, {useState} from 'react';
import BasicCRUD from './BasicCRUD';
import { DatePicker, Select, Input } from 'antd';
import styles from './UserCRUD.css';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

const userColumns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
        render: () => '********',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Date of Birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        render: (date) => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Active',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive) => isActive ? 'Yes' : 'No',
    },
];

const UserCRUD = () => {
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
            return [];
        }
    };

    const createUser = async (userData) => {
        try {
            const response = await axios.post(API_URL, userData);
            console.log('User created:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to create user');
            console.error('Error creating user:', err);
            throw err;
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, userData);
            console.log('User updated:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to update user');
            console.error('Error updating user:', err);
            throw err;
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('User deleted:', id);
        } catch (err) {
            setError('Failed to delete user');
            console.error('Error deleting user:', err);
            throw err;
        }
    };

    const customFormItems = [
        {
            name: 'dateOfBirth',
            label: 'Date of Birth',
            rules: [{ required: true, message: 'Please input date of birth!' }],
            render: () => <DatePicker />
        },
        {
            name: 'password',
            label: 'Password',
            rules: [
                { required: true, message: 'Please input password!' },
                { min: 8, message: 'Password must be at least 8 characters long!' }
            ],
            render: () => <Input.Password />
        },
        {
            name: 'role',
            label: 'Role',
            rules: [{ required: true, message: 'Please select role!' }],
            render: () => (
                <Select>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="guide">Guide</Select.Option>
                    <Select.Option value="tourist">Tourist</Select.Option>
                    <Select.Option value="droneOperator">Drone Operator</Select.Option>
                </Select>
            )
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            dependencies: ['password'],
            rules: [
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                    },
                }),
            ],
            render: () => <Input.Password />
        },
        {
            name: ['address', 'street'],
            label: 'Street',
            rules: [{ required: true, message: 'Please input street!' }],
        },
        {
            name: ['address', 'city'],
            label: 'City',
            rules: [{ required: true, message: 'Please input city!' }],
        },
        {
            name: ['address', 'country'],
            label: 'Country',
            rules: [{ required: true, message: 'Please input country!' }],
        },
        {
            name: ['address', 'postalCode'],
            label: 'Postal Code',
            rules: [{ required: true, message: 'Please input postal code!' }],
        },
        {
            name: 'isActive',
            label: 'Active',
            rules: [{ required: true, message: 'Please select status!' }],
            render: () => (
                <Select>
                    <Select.Option value={true}>Yes</Select.Option>
                    <Select.Option value={false}>No</Select.Option>
                </Select>
            )
        },
    ];

    return (
        <div className={styles.userCrudContainer}>
            {error && <div className={styles.error}>{error}</div>}
            <BasicCRUD
                entityName="User"
                columns={userColumns}
                fetchData={fetchUsers}
                createEntity={createUser}
                updateEntity={updateUser}
                deleteEntity={deleteUser}
                customFormItems={customFormItems}
                cssClasses={{
                    header: styles.header,
                    title: styles.title,
                    addButton: styles.addButton,
                    table: styles.table,
                    actionButton: styles.actionButton,
                    editButton: styles.editButton,
                    deleteButton: styles.deleteButton,
                    modal: styles.modal,
                    modalTitle: styles.modalTitle,
                    form: styles.form,
                    formItem: styles.formItem,
                    formLabel: styles.formLabel,
                    formInput: styles.formInput,
                    submitButton: styles.submitButton,
                }}
            />
        </div>
    );
};

export default UserCRUD;