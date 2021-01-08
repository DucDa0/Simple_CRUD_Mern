/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Upload, message } from 'antd';
import { connect } from 'react-redux';
import { AddProduct, EditProduct } from '../../redux/actions/productAction';
import { PlusOutlined } from '@ant-design/icons';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const FormModal = ({
  visible,
  setVisible,
  edit,
  item,
  AddProduct,
  EditProduct,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (edit) {
      form.resetFields();
      setFileList(
        item.image.map((img, index) => ({
          uid: index,
          thumbUrl: img,
          response: { url: img },
        }))
      );
    }
  }, [item]);
  const onFinish = async (values) => {
    const { name, description } = values;
    if (fileList.length <= 0) {
      return message.error('Vui long chon hinh anh');
    }
    if (edit) {
      setConfirmLoading(true);

      const res = await EditProduct({
        id: item._id,
        name,
        description,
        image: fileList.map((img) => img.response.url),
      });
      setConfirmLoading(false);
      if (res) {
        setVisible(false);
      }
      return;
    }
    setConfirmLoading(true);
    const res = await AddProduct({
      name,
      description,
      image: fileList.map((img) => img.response.url),
    });
    setConfirmLoading(false);
    if (res) {
      setVisible(false);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setFileList(fileList);
  };
  // const handleCkeditor = (event, editor) => {
  //   let data = editor.getData();
  //   setContent(data);
  // };
  console.log(fileList);
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
          <Upload
            action='/uploadProduct'
            listType='picture-card'
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        {/* <Form.Item>
          <CKEditor
            config={{
              ckfinder: {
                uploadUrl: '/upload',
              },
            }}
            editor={ClassicEditor}
            onChange={handleCkeditor}
          />
        </Form.Item> */}
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
