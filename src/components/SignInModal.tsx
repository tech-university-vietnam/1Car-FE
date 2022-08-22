import { FacebookFilled, GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Divider, Form, Input, Modal } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

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
            <SignInForm />
        </Modal>
    )
})

export function SignInForm() {
    const [form] = Form.useForm();
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const onFormChange = async () => {
        try {
            await form.validateFields(["email", "password"]);
            setDisable(false);
        } catch (err: any) {
            if (err?.errorFields?.length === 0) {
                setDisable(false);
            }
            else
                setDisable(true);
        }
    }

    const onSubmit = async ()=>{
        const fields = form.getFieldsValue();
        
        //simulate call api
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        }, 1000)
    }

    return (
        <Form form={form} validateTrigger="onBlur" autoComplete={"off"} onChange={onFormChange}>
            <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter your email" }]} >
                <Input size='large' placeholder='Email' className='p-3 border border-gray-200 rounded w-full' type={"email"} autoComplete={"off"} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                <Input size='large' placeholder='Password' className='p-3 border border-gray-200 rounded w-full' type={"password"} autoComplete={"off"} />
            </Form.Item>
            <Form.Item>
                <Checkbox><span className='opacity-50'>Remember me.</span></Checkbox>
            </Form.Item>
            <Form.Item>
                <button disabled={disable || loading} onClick={onSubmit} className='w-full text-white h-10 rounded text-base disabled:opacity-50 flex justify-center items-center' style={{ background: "#66BFBF", borderColor: "#66BFBF" }}>{loading ? <LoadingOutlined /> : "Login"}</button>
            </Form.Item>
            <Divider><span className='text-xs text-gray-400'>Or</span></Divider>
            <div>
                <button className='w-full rounded p-2 bg-blue-500 my-3 text-white flex items-center justify-center'><FacebookFilled className='mr-2' /> Login with Facebook</button>
                <button className='w-full rounded p-2 bg-red-500 my-3 text-white flex items-center justify-center '><GoogleOutlined className='mr-2' /> Login with Google</button>
            </div>
        </Form>);
}
