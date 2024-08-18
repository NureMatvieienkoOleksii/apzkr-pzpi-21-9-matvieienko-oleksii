import React, { useState } from 'react';
import BasicCRUD from './BasicCRUD';
import {Select, Input, InputNumber} from 'antd';
import styles from './DronesCRUD.css';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/drones';

const droneColumns = [
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
    },
    {
        title: 'Serial Number',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Max Flight Time (min)',
        dataIndex: 'maxFlightTime',
        key: 'maxFlightTime',
    },
    {
        title: 'Max Range (km)',
        dataIndex: 'maxRange',
        key: 'maxRange',
    },
];

const DronesCRUD = () => {
    const [error, setError] = useState(null);

    const fetchDrones = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err) {
            setError('Failed to fetch drones');
            console.error('Error fetching drones:', err);
            return [];
        }
    };

    const createDrone = async (droneData) => {
        try {
            const response = await axios.post(API_URL, droneData);
            console.log('Drone created:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to create drone');
            console.error('Error creating drone:', err);
            throw err;
        }
    };

    const updateDrone = async (id, droneData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, droneData);
            console.log('Drone updated:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to update drone');
            console.error('Error updating drone:', err);
            throw err;
        }
    };

    const deleteDrone = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('Drone deleted:', id);
        } catch (err) {
            setError('Failed to delete drone');
            console.error('Error deleting drone:', err);
            throw err;
        }
    };

    const customFormItems = [
        {
            name: 'model',
            label: 'Model',
            rules: [{ required: true, message: 'Please input drone model!' }],
        },
        {
            name: 'serialNumber',
            label: 'Serial Number',
            rules: [{ required: true, message: 'Please input serial number!' }],
        },
        {
            name: 'status',
            label: 'Status',
            rules: [{ required: true, message: 'Please select status!' }],
            render: () => (
                <Select>
                    <Select.Option value="available">Available</Select.Option>
                    <Select.Option value="in use">In Use</Select.Option>
                    <Select.Option value="maintenance">Maintenance</Select.Option>
                </Select>
            )
        },
        {
            name: 'maxFlightTime',
            label: 'Max Flight Time (minutes)',
            rules: [
                { required: true, message: 'Please input max flight time!' },
                { type: 'number', min: 1, message: 'Flight time must be at least 1 minute!' }
            ],
            render: () => <InputNumber min={1} step={1} />
        },
        {
            name: 'maxRange',
            label: 'Max Range (km)',
            rules: [
                { required: true, message: 'Please input max range!' },
                { type: 'number', min: 0.1, message: 'Range must be at least 0.1 km!' }
            ],
            render: () => <InputNumber min={0.1} step={0.1} />
        },
    ];

    return (
        <div className={styles.dronesCrudContainer}>
            {error && <div className={styles.error}>{error}</div>}
            <BasicCRUD
                entityName="Drone"
                columns={droneColumns}
                fetchData={fetchDrones}
                createEntity={createDrone}
                updateEntity={updateDrone}
                deleteEntity={deleteDrone}
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

export default DronesCRUD;