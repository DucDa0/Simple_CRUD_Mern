import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { register } from '../../redux/actions/authAction';

const Register = ({ register }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { name, email, password } = values;
    setIsProcessing(true);
    await register({ name, email, password });
    setIsProcessing(false);
  };

  return (
    <section className='login'>
      <div className='login__wrap container'>
        <div className='logn__form'>
          <Card style={{ maxWidth: '600px', margin: 'auto' }}>
            <Form
              name='normal_login'
              className='login-form'
              size='large'
              onFinish={onFinish}
            >
              <Form.Item style={{ textAlign: 'center' }}>
                <h1>Đăng ký</h1>
              </Form.Item>
              <Form.Item
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên!',
                  },
                ]}
              >
                <Input placeholder='Tên' />
              </Form.Item>
              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'Email không hợp lệ',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ]}
              >
                <Input placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder='Password' />
              </Form.Item>
              <Form.Item
                name='confirm'
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('Mật khẩu không khớp!');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='Password Confirm' />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button
                  loading={isProcessing}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Đăng ký
                </Button>{' '}
                hoặc <Link to='/login'>đăng nhập</Link>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default connect(null, { register })(Register);
