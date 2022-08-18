import { Button, Checkbox, Divider, Form, Input, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons"

export default forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const onClose = () => setVisible(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true)
        }
    }));


    return (
        <Modal visible={visible} onCancel={onClose} footer={null} closable={false}>
            <h2 className='text-center text-2xl mb-6'>Welcome Back</h2>
            <Form validateTrigger="onBlur" autoComplete={"off"}>
                <Form.Item name="email" rules={[{ type: "email", message: "Please enter your email" }]} >
                    <Input size='large' placeholder='Email' className='p-3 border border-gray-200 rounded w-full' type={"email"} autoComplete={"off"} />
                </Form.Item>
                <Form.Item name="password">
                    <Input size='large' placeholder='Password' className='p-3 border border-gray-200 rounded w-full' type={"password"} autoComplete={"off"} />
                </Form.Item>
                <Form.Item>
                    <Checkbox><span className='opacity-50'>Remember me.</span></Checkbox>
                </Form.Item>
                <Form.Item>
                    <button className='w-full text-white p-2 rounded text-base' style={{ background: "#66BFBF", borderColor: "#66BFBF" }}>Login</button>
                </Form.Item>
                <Divider><span className='text-xs text-gray-400'>Or</span></Divider>
                <div>
                    <button className='w-full rounded p-2 bg-blue-500 my-3 text-white flex items-center justify-center'><FacebookFilled className='mr-2' /> Login with Facebook</button>
                    <button className='w-full rounded p-2 bg-red-500 my-3 text-white flex items-center justify-center '><GoogleOutlined className='mr-2' /> Login with Google</button>
                </div>
            </Form>
        </Modal>
    )
})
