import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  login,
  googleLogin,
  facebookLogin,
} from '../../redux/actions/authAction';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import {
  REACT_APP_FACEBOOK_CLIENT,
  REACT_APP_GOOGLE_CLIENT,
} from '../../secret';

import { GooglePlus, Facebook } from '../../icons';

const Login = ({ history, login, googleLogin, facebookLogin }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onFinish = async (values) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    const { email, password } = values;
    setIsProcessing(true);
    const res = await login(email, password);
    if (res) {
      return history.push('/');
    }
    setIsProcessing(false);
  };

  const googleLoginHandle = async (idToken) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    if (!idToken) {
      return;
    }
    const res = await googleLogin(idToken);
    if (res) {
      return history.push('/');
    }
  };
  const responseGoogle = (response) => {
    googleLoginHandle(response.tokenId);
  };

  // Handle login with Facebook Account
  const facebookLoginHandle = async (userID, accessToken) => {
    if (localStorage.token) {
      return window.location.reload(false);
    }
    if (!userID || !accessToken) {
      return;
    }
    const res = await facebookLogin(userID, accessToken);
    if (res) {
      return history.push('/');
    }
  };

  const responseFacebook = (response) => {
    facebookLoginHandle(response.userID, response.accessToken);
  };

  return (
    <section className='login'>
      <div className='login__wrap container'>
        <div className='logn__form'>
          <Card style={{ maxWidth: '600px', margin: 'auto' }}>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
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
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={isProcessing}
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Đăng nhập
                </Button>
                hoặc <Link to='/register'>đăng ký ngay!</Link>
              </Form.Item>
            </Form>
            <p style={{ textAlign: 'center' }}>hoặc đăng nhập với</p>
            <p className='login__social'>
              <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                  <Button
                    className='login__google'
                    type='primary'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#d73d32',
                    }}
                    danger
                    size={'large'}
                    onClick={renderProps.onClick}
                  >
                    <GooglePlus />
                    <div style={{ margin: '0 1.5rem' }}>Google+</div>
                  </Button>
                )}
              />
              <FacebookLogin
                appId={REACT_APP_FACEBOOK_CLIENT}
                autoLoad={false}
                fields='name,email'
                callback={responseFacebook}
                render={(renderProps) => (
                  <Button
                    className='login__facebook'
                    type='primary'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#0a426e',
                    }}
                    size={'large'}
                    onClick={renderProps.onClick}
                  >
                    <Facebook />
                    <div style={{ margin: '0 1.4rem' }}>Facebook</div>
                  </Button>
                )}
              />
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default connect(null, { login, googleLogin, facebookLogin })(Login);
