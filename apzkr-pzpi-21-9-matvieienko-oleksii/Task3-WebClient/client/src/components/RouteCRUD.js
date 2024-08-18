import React, { useState } from 'react';
import BasicCRUD from './BasicCRUD';
import { Select, Input, InputNumber } from 'antd';
import styles from './RouteCRUD.css';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/routes';

const routeColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
    },
    {
        title: 'Duration (hours)',
        dataIndex: 'duration',
        key: 'duration',
    },
    {
        title: 'Terrain Type',
        dataIndex: 'terrainType',
        key: 'terrainType',
    },
];

const RouteCRUD = () => {
    const [error, setError] = useState(null);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err) {
            setError('Failed to fetch routes');
            console.error('Error fetching routes:', err);
            return [];
        }
    };

    const createRoute = async (routeData) => {
        try {
            const response = await axios.post(API_URL, routeData);
            console.log('Route created:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to create route');
            console.error('Error creating route:', err);
            throw err;
        }
    };

    const updateRoute = async (id, routeData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, routeData);
            console.log('Route updated:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to update route');
            console.error('Error updating route:', err);
            throw err;
        }
    };

    const deleteRoute = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('Route deleted:', id);
        } catch (err) {
            setError('Failed to delete route');
            console.error('Error deleting route:', err);
            throw err;
        }
    };

    const customFormItems = [
        {
            name: 'name',
            label: 'Name',
            rules: [{ required: true, message: 'Please input route name!' }],
        },
        {
            name: 'description',
            label: 'Description',
            rules: [{ required: true, message: 'Please input route description!' }],
            render: () => <Input.TextArea />
        },
        {
            name: 'difficulty',
            label: 'Difficulty',
            rules: [{ required: true, message: 'Please select difficulty!' }],
            render: () => (
                <Select>
                    <Select.Option value="easy">Easy</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="hard">Hard</Select.Option>
                </Select>
            )
        },
        {
            name: 'duration',
            label: 'Duration (hours)',
            rules: [
                { required: true, message: 'Please input duration!' },
                { type: 'number', min: 0.5, message: 'Duration must be at least 0.5 hours!' }
            ],
            render: () => <InputNumber min={0.5} step={0.5} />
        },
        {
            name: 'terrainType',
            label: 'Terrain Type',
            rules: [{ required: true, message: 'Please select terrain type!' }],
            render: () => (
                <Select>
                    <Select.Option value="park">Park</Select.Option>
                    <Select.Option value="forest">Forest</Select.Option>
                    <Select.Option value="mountains">Mountains</Select.Option>
                    <Select.Option value="river">River</Select.Option>
                </Select>
            )
        },
    ];

    return (
        <div className={styles.routeCrudContainer}>
            {error && <div className={styles.error}>{error}</div>}
            <BasicCRUD
                entityName="Route"
                columns={routeColumns}
                fetchData={fetchRoutes}
                createEntity={createRoute}
                updateEntity={updateRoute}
                deleteEntity={deleteRoute}
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

export default RouteCRUD;