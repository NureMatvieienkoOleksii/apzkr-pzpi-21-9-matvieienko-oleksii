import React, { useState } from 'react';
import BasicCRUD from './BasicCRUD';
import { Select, Input, InputNumber } from 'antd';
import styles from './EquipmentCRUD.css';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/equipment';

const equipmentColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text) => text ? text.substring(0, 50) + (text.length > 50 ? '...' : '') : '',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Condition',
        dataIndex: 'condition',
        key: 'condition',
    },
];

const EquipmentCRUD = () => {
    const [error, setError] = useState(null);

    const fetchEquipment = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (err) {
            setError('Failed to fetch equipment');
            console.error('Error fetching equipment:', err);
            return [];
        }
    };

    const createEquipment = async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            console.log('Equipment created:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to create equipment');
            console.error('Error creating equipment:', err);
            throw err;
        }
    };

    const updateEquipment = async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            console.log('Equipment updated:', response.data);
            return response.data;
        } catch (err) {
            setError('Failed to update equipment');
            console.error('Error updating equipment:', err);
            throw err;
        }
    };

    const deleteEquipment = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log('Equipment deleted:', id);
        } catch (err) {
            setError('Failed to delete equipment');
            console.error('Error deleting equipment:', err);
            throw err;
        }
    };

    const customFormItems = [
        {
            name: 'name',
            label: 'Name',
            rules: [{ required: true, message: 'Please input the equipment name!' }],
        },
        {
            name: 'description',
            label: 'Description',
            rules: [{ required: true, message: 'Please input the equipment description!' }],
            render: () => <Input.TextArea />
        },
        {
            name: 'quantity',
            label: 'Quantity',
            rules: [
                { required: true, message: 'Please input the quantity!' },
                { type: 'number', min: 0, message: 'Quantity must be at least 0!' }
            ],
            render: () => <InputNumber min={0} />
        },
        {
            name: 'condition',
            label: 'Condition',
            rules: [{ required: true, message: 'Please select the equipment condition!' }],
            render: () => (
                <Select>
                    <Select.Option value="new">New</Select.Option>
                    <Select.Option value="good">Good</Select.Option>
                    <Select.Option value="fair">Fair</Select.Option>
                    <Select.Option value="poor">Poor</Select.Option>
                </Select>
            )
        },
    ];

    return (
        <div className={styles.equipmentCrudContainer}>
            {error && <div className={styles.error}>{error}</div>}
            <BasicCRUD
                entityName="Equipment"
                columns={equipmentColumns}
                fetchData={fetchEquipment}
                createEntity={createEquipment}
                updateEntity={updateEquipment}
                deleteEntity={deleteEquipment}
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

export default EquipmentCRUD;