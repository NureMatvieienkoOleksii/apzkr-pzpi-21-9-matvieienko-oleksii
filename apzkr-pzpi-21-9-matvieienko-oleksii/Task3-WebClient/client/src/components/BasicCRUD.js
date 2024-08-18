import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const BasicCRUD = ({
                       entityName,
                       columns,
                       fetchData,
                       createEntity,
                       updateEntity,
                       deleteEntity,
                       customFormItems = [],
                       cssClasses = {}
                   }) => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        fetchEntities();
    }, []);

    const fetchEntities = async () => {
        const result = await fetchData();
        setData(result);
    };

    const showModal = (record = null) => {
        setEditingRecord(record);
        if (record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingRecord) {
                await updateEntity(editingRecord.id, values);
            } else {
                await createEntity(values);
            }
            setIsModalVisible(false);
            fetchEntities();
        } catch (error) {
            console.error('Validate Failed:', error);
        }
    };

    const handleDelete = async (id) => {
        await deleteEntity(id);
        fetchEntities();
    };

    const tableColumns = [
        ...columns,
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button className={`${cssClasses.actionButton} ${cssClasses.editButton}`} onClick={() => showModal(record)}>Edit</Button>
                    <Button className={`${cssClasses.actionButton} ${cssClasses.deleteButton}`} onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    const renderFormItem = (item) => {
        if (item.render) {
            return item.render();
        }
        return <Input className={cssClasses.formInput} />;
    };

    return (
        <div>
            <div className={cssClasses.header}>
                <h2 className={cssClasses.title}>{entityName} Management</h2>
                <Button className={cssClasses.addButton} onClick={() => showModal()}>Add New {entityName}</Button>
            </div>
            <Table className={cssClasses.table} columns={tableColumns} dataSource={data} rowKey="id" />
            <Modal
                className={cssClasses.modal}
                title={<span className={cssClasses.modalTitle}>{`${editingRecord ? 'Edit' : 'Add'} ${entityName}`}</span>}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical" className={cssClasses.form}>
                    {columns.map(column => {
                        const customItem = customFormItems.find(item => item.name === column.dataIndex);
                        if (customItem) {
                            return (
                                <Form.Item
                                    key={customItem.name}
                                    name={customItem.name}
                                    label={<span className={cssClasses.formLabel}>{customItem.label || column.title}</span>}
                                    rules={customItem.rules}
                                    className={cssClasses.formItem}
                                >
                                    {renderFormItem(customItem)}
                                </Form.Item>
                            );
                        }
                        return (
                            <Form.Item
                                key={column.dataIndex}
                                name={column.dataIndex}
                                label={<span className={cssClasses.formLabel}>{column.title}</span>}
                                rules={[{ required: true, message: `Please input ${column.title}!` }]}
                                className={cssClasses.formItem}
                            >
                                <Input className={cssClasses.formInput} />
                            </Form.Item>
                        );
                    })}
                    {customFormItems.filter(item => !columns.some(col => col.dataIndex === item.name)).map(item => (
                        <Form.Item
                            key={Array.isArray(item.name) ? item.name.join('.') : item.name}
                            name={item.name}
                            label={<span className={cssClasses.formLabel}>{item.label}</span>}
                            rules={item.rules}
                            className={cssClasses.formItem}
                        >
                            {renderFormItem(item)}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    );
};

export default BasicCRUD;