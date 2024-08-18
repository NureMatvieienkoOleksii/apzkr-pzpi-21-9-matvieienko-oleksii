import React, { useState } from 'react';
import BasicCRUD from './BasicCRUD';
import { Select, Input, InputNumber, DatePicker } from 'antd';
import styles from './NaturalConditionCRUD.css';
import axios from 'axios';
import moment from 'moment';

const API_URL = 'http://localhost:8000/api/natural-conditions';

const naturalConditionColumns = [
    {
        title: 'Route',
        dataIndex: 'routeId',
        key: 'routeId',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
        title: 'Weather Conditions',
        dataIndex: 'weatherConditions',
        key: 'weatherConditions',
    },
    {
        title: 'Water Level (m)',
        dataIndex: 'waterLevel',
        key: 'waterLevel',
    },
    {
        title: 'Temperature (°C)',
        dataIndex: 'temperature',
        key: 'temperature',
    },
    {
        title: 'Additional Info',
        dataIndex: 'additionalInfo',
        key: 'additionalInfo',
        render: (text) => text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : '',
    },
];

const NaturalConditionCRUD = () => {
    const [error, setError] = useState(null);
    const [routes, setRoutes] = useState([]);

    React.useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/routes');
            setRoutes(response.data);
        } catch (err) {
            console.error('Error fetching routes:', err);
        }
    };

    const fetchNaturalConditions = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data.map(item => ({
                ...item,
                date: moment(item.date)
            }));
        } catch (err) {
            setError('Failed to fetch natural conditions');
            console.error('Error fetching natural conditions:', err);
            return [];
        }
    };

    const createNaturalCondition = async (data) => {
        try {
            const formattedData = {
                ...data,
                date: moment(data.date).format('YYYY-MM-DD')
            };
            const response = await axios.post(API_URL, formattedData);
            console.log('Natural condition created:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to create natural condition');
            console.error('Error creating natural condition:', err);
            throw err;
        }
    };

    const updateNaturalCondition = async (id, data) => {
        try {
            const formattedData = {
                ...data,
                date: moment(data.date).format('YYYY-MM-DD')
            };
            const response = await axios.put(`${API_URL}/${id}`, formattedData);
            console.log('Natural condition updated:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to update natural condition');
            console.error('Error updating natural condition:', err);
            throw err;
        }
    };

    const deleteNaturalCondition = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('Natural condition deleted:', id);
        } catch (err) {
            setError('Failed to delete natural condition');
            console.error('Error deleting natural condition:', err);
            throw err;
        }
    };

    const customFormItems = [
        {
            name: 'routeId',
            label: 'Route',
            rules: [{ required: true, message: 'Please select a route!' }],
            render: () => (
                <Select>
                    {routes.map(route => (
                        <Select.Option key={route._id} value={route._id}>{route.name}</Select.Option>
                    ))}
                </Select>
            )
        },
        {
            name: 'date',
            label: 'Date',
            rules: [{ required: true, message: 'Please select a date!' }],
            render: () => <DatePicker />,
            getValueFromEvent: (date) => date ? date.format('YYYY-MM-DD') : null,
            getValueProps: (value) => ({ value: value ? moment(value) : null }),
        },
        {
            name: 'weatherConditions',
            label: 'Weather Conditions',
            rules: [{ required: true, message: 'Please input weather conditions!' }],
        },
        {
            name: 'waterLevel',
            label: 'Water Level (m)',
            rules: [
                { required: true, message: 'Please input water level!' },
                { type: 'number', min: 0, message: 'Water level must be at least 0 meters!' }
            ],
            render: () => <InputNumber min={0} step={0.1} />
        },
        {
            name: 'temperature',
            label: 'Temperature (°C)',
            rules: [
                { required: true, message: 'Please input temperature!' },
                { type: 'number', message: 'Please input a valid temperature!' }
            ],
            render: () => <InputNumber step={0.1} />
        },
        {
            name: 'additionalInfo',
            label: 'Additional Information',
            rules: [{ required: false }],
            render: () => <Input.TextArea />
        },
    ];

    return (
        <div className={styles.naturalConditionCrudContainer}>
            {error && <div className={styles.error}>{error}</div>}
            <BasicCRUD
                entityName="Natural Condition"
                columns={naturalConditionColumns}
                fetchData={fetchNaturalConditions}
                createEntity={createNaturalCondition}
                updateEntity={updateNaturalCondition}
                deleteEntity={deleteNaturalCondition}
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

export default NaturalConditionCRUD;