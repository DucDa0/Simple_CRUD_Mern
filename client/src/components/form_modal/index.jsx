/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { AddProduct, EditProduct } from '../../redux/actions/productAction';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import Indent from '@ckeditor/ckeditor5-indent/src/indent';
const FormModal = ({
  visible,
  setVisible,
  edit,
  item,
  AddProduct,
  EditProduct,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    if (edit) {
      form.resetFields();
    }
  }, [item]);
  const onFinish = async (values) => {
    const { name, description } = values;
    if (edit) {
      setConfirmLoading(true);
      const res = await EditProduct({ id: item._id, name, description });
      setConfirmLoading(false);
      if (res) {
        setVisible(false);
      }
      return;
    }
    setConfirmLoading(true);
    const res = await AddProduct({ name, description, content });
    setConfirmLoading(false);
    if (res) {
      setVisible(false);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleCkeditor = (event, editor) => {
    let data = editor.getData();
    setContent(data);
  };
  return (
    <Modal
      maskClosable={!confirmLoading}
      closable={false}
      title={!edit ? 'Thêm từ' : 'Sửa từ'}
      visible={visible}
      onOk={onFinish}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        encType='multipart/form-data'
        form={form}
        size='large'
        layout='vertical'
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          initialValue={edit && item ? item.name : ''}
          name='name'
          label='Từ'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập từ!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={edit && item ? item.description : ''}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nghĩa của từ!',
            },
          ]}
          name='description'
          label='Mô tả'
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <input type='file' name='productImg' />
        </Form.Item>
        <Form.Item>
          <CKEditor
            config={{
              ckfinder: {
                uploadUrl: '/upload',
              },
            }}
            editor={ClassicEditor}
            onChange={handleCkeditor}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button
            style={{ marginRight: '1rem' }}
            disabled={confirmLoading}
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button type='primary' loading={confirmLoading} htmlType='submit'>
            {!edit ? 'Thêm' : 'Lưu'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(null, { AddProduct, EditProduct })(FormModal);
