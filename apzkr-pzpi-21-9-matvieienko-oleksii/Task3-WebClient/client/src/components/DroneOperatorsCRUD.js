import React, { useState, useEffect } from 'react';
import BasicCRUD from './BasicCRUD';
import { Select, Input, InputNumber, DatePicker } from 'antd';
import styles from './DroneOperatorsCRUD.css';
import axios from 'axios';
import moment from 'moment';

const API_URL = 'http://localhost:8000/api/drone-operators';

const droneOperatorColumns = [
    {
        title: 'Name',
        dataIndex: ['user', 'firstName'],
        key: 'firstName',
        render: (text, record) => record.user
            ? `${record.user.firstName} ${record.user.lastName}`
            : 'Unknown User',
    },
    {
        title: 'Email',
        dataIndex: ['user', 'email'],
        key: 'email',
    },
    {
        title: 'License Number',
        dataIndex: ['license', 'number'],
        key: 'licenseNumber',
    },
    {
        title: 'License Issue Date',
        dataIndex: ['license', 'issueDate'],
        key: 'licenseIssueDate',
        render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
        title: 'License Expiration Date',
        dataIndex: ['license', 'expirationDate'],
        key: 'licenseExpirationDate',
        render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
        title: 'Experience (years)',
        dataIndex: 'experience',
        key: 'experience',
    },
    {
        title: 'Specializations',
        dataIndex: 'specializations',
        key: 'specializations',
        render: (specializations) => specializations.join(', '),
    },
    {
        title: 'Assigned Drones',
        dataIndex: 'assignedDrones',
        key: 'assignedDrones',
        render: (drones) => drones.length,
    },
];

const DroneOperatorsCRUD = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [drones, setDrones] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchDrones();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            setUsers(response.data.filter(user => user.role === 'droneOperator'));
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchDrones = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/drones');
            setDrones(response.data);
        } catch (err) {
            console.error('Error fetching drones:', err);
        }
    };

    const fetchDroneOperators = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err) {
            setError('Failed to fetch drone operators');
            console.error('Error fetching drone operators:', err);
            return [];
        }
    };

    const createDroneOperator = async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            console.log('Drone operator created:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to create drone operator');
            console.error('Error creating drone operator:', err);
            throw err;
        }
    };

    const updateDroneOperator = async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            console.log('Drone operator updated:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to update drone operator');
            console.error('Error updating drone operator:', err);
            throw err;
        }
    };

    const deleteDroneOperator = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('Drone operator deleted:', id);
        } catch (err) {
            setError('Failed to delete drone operator');
            console.error('Error deleting drone operator:', err);
            throw err;
        }
    };

    const customFormItems = [
        {
            name: 'userId',
            label: 'User',
            rules: [{ required: true, message: 'Please select a user!' }],
            render: () => (
                <Select>
                    {users.map(user => (
                        <Select.Option key={user._id} value={user._id}>
                            {`${user.firstName} ${user.lastName} (${user.email})`}
                        </Select.Option>
                    ))}
                </Select>
            )
        },
        {
            name: ['license', 'number'],
            label: 'License Number',
            rules: [{ required: true, message: 'Please input the license number!' }],
        },
        {
            name: ['license', 'issueDate'],
            label: 'License Issue Date',
            rules: [{ required: true, message: 'Please select the license issue date!' }],
            render: () => <DatePicker />,
        },
        {
            name: ['license', 'expirationDate'],
            label: 'License Expiration Date',
            rules: [{ required: true, message: 'Please select the license expiration date!' }],
            render: () => <DatePicker />,
        },
        {
            name: 'experience',
            label: 'Experience (years)',
            rules: [
                { required: true, message: 'Please input the experience!' },
                { type: 'number', min: 0, message: 'Experience must be at least 0!' }
            ],
            render: () => <InputNumber min={0} />
        },
        {
            name: 'specializations',
            label: 'Specializations',
            rules: [{ required: true, message: 'Please input at least one specialization!' }],
            render: () => <Select mode="tags" style={{ width: '100%' }} placeholder="Enter specializations" />
        },
        {
            name: 'assignedDrones',
            label: 'Assigned Drones',
            rules: [{ required: false }],
            render: () => (
                <Select mode="multiple" style={{ width: '100%' }} placeholder="Select assigned drones">
                    {drones.map(drone => (
                        <Select.Option key={drone._id} value={drone._id}>
                            {`${drone.model} (${drone.serialNumber})`}
                        </Select.Option>
                    ))}
                </Select>
            )
        },
    ];

    return (
        <div className={styles.droneOperatorsCrudContainer}>
            {error && <div className={styles.error}>{error}</div>}
            <BasicCRUD
                entityName="Drone Operator"
                columns={droneOperatorColumns}
                fetchData={fetchDroneOperators}
                createEntity={createDroneOperator}
                updateEntity={updateDroneOperator}
                deleteEntity={deleteDroneOperator}
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

export default DroneOperatorsCRUD;