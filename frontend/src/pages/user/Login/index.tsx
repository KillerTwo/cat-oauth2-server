import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  LoginForm,
  ProFormInstance,
} from '@ant-design/pro-form';
import { history, FormattedMessage, useModel } from 'umi';
import Footer from '@/components/Footer';
import { getCaptchaImage, getFakeCaptcha, login } from '@/services/system/login';

import styles from './index.less';
import { SYSTEM } from '@/services/system/typings';

import { setToken } from '@/utils/auth';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginFormRef = useRef<ProFormInstance<SYSTEM.LoginBody>>();

  // const [loginForm, setLoginForm] = useState<{username?: string, password?: string, rememberMe?: boolean}>({username: "", password: "", rememberMe: false});

  const [captchaOnOff, setCaptchaOnOff] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [codeUuid, setCodeUuid] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');

  const getCookies = () => {
    const username = Cookies.get('username');
    const password = Cookies.get('password');
    const phone = Cookies.get('phone');
    const rememberMe = Cookies.get('rememberMe');
    // setLoginForm({username, password, rememberMe: rememberMe === "true"});
    return { username, password, rememberMe: rememberMe === 'true', phone };
  };

  const captchaImage = async () => {
    const resData = await getCaptchaImage();
    if (resData.code === 200) {
      const data = resData.data;
      if (!data.captchaOnOff) {
        setCaptchaOnOff(data.captchaOnOff);
      } else {
        setImgSrc(`data:image/gif;base64,${data.img}`);
        setCodeUuid(data.uuid);
      }
    }
  };

  useEffect(() => {
    captchaImage();
  }, []);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const fetchMenuInfo = async () => {
    const menuDataInfo = await initialState?.fetchMenuInfo?.();
    if (menuDataInfo) {
      await setInitialState((s) => ({
        ...s,
        customMenuData: menuDataInfo,
      }));
    }
  };

  const handleSubmit = async (values: SYSTEM.LoginParams) => {
    if (!captcha) {
      message.error('??????????????????');
      return;
    }
    try {
      if (values.autoLogin === true) {
        if (type === 'account') {
          Cookies.set('username', values.username || '', { expires: 30 });
          Cookies.set('password', values.password || '', { expires: 30 });
        } else if (type === 'mobile') {
          Cookies.set('phone', values.phone || '', { expires: 30 });
        }
        Cookies.set('rememberMe', 'true', { expires: 30 });
      } else {
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('phone');
        Cookies.remove('rememberMe');
      }
      // ??????
      const msg = await login({ ...values, code: captcha, uuid: codeUuid });
      console.log('login msg: ', msg);

      if (msg?.code === 200) {
        setToken(msg?.data?.token || '');
        message.success('???????????????');
        await fetchUserInfo();
        // ??????????????????
        await fetchMenuInfo();
        /** ????????????????????? redirect ????????????????????? */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      await captchaImage();
      setCaptcha('');
    } catch (error) {
      console.log('login error ', error);
      message.error('????????????????????????!');
    }
  };
  return (
    <div className={styles.container}>
      {/*<div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>*/}
      <div className={styles.content}>
        <LoginForm
          formRef={loginFormRef}
          logo={<img alt="logo" style={{ borderRadius: 30 }} src="/logo1.jpg" />}
          title="??? ???"
          subTitle={
            '?????? ??????spring-boot???ant-design-pro???RuoYi-Vue????????????????????????(admin/admin123)'
          }
          request={async () => {
            const data = getCookies();
            return {
              autoLogin: data.rememberMe,
              username: data.username,
              password: data.password,
              phone: data.phone,
            };
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="??????????????????"
            />,
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as SYSTEM.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'??????????????????'} />
            <Tabs.TabPane key="mobile" tab={'???????????????'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'?????????: admin'}
                rules={[
                  {
                    required: true,
                    message: '??????????????????',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'??????: admin123'}
                rules={[
                  {
                    required: true,
                    message: '??????????????????',
                  },
                ]}
              />
            </>
          )}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="phone"
                placeholder={'?????????'}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '????????????????????????',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'??????????????????'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count}???????????????`;
                  }
                  return '???????????????';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '?????????????????????',
                  },
                ]}
                onGetCaptcha={async () => {
                  const mobile = loginFormRef.current?.getFieldsValue().phone || '';
                  if (!mobile) {
                    message.error('?????????????????????');
                    throw new Error('?????????????????????');
                  }
                  if (!captcha) {
                    message.error('?????????????????????');
                    throw new Error('?????????????????????');
                  }
                  const result = await getFakeCaptcha({
                    phone: mobile,
                    uuid: codeUuid,
                    code: captcha,
                  });
                  if (result.code === 200) {
                    message.success(`???????????????????????????????????????${result.data}`);
                    return;
                  } else {
                    throw new Error(result.msg);
                  }
                }}
              />
            </>
          )}
          {captchaOnOff && (
            <div className="ant-row ant-form-item" style={{ rowGap: '0px' }}>
              <div className="ant-col ant-form-item-control">
                <div className="ant-form-item-control-input">
                  <div className="ant-form-item-control-input-content">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        className="ant-input-affix-wrapper ant-input-affix-wrapper-lg"
                        style={{
                          flex: '1 1 0%',
                          transition: ' width 0.3s ease 0s',
                          marginRight: '8px',
                        }}
                      >
                        <span className="ant-input-prefix"></span>
                        <input
                          id="captcha"
                          placeholder="?????????????????????"
                          onChange={(target) => {
                            setCaptcha(target.target.value);
                          }}
                          className="ant-input"
                          type="text"
                          value={captcha}
                        />
                      </span>
                      <img
                        src={imgSrc}
                        style={{
                          width: '100px',
                          height: '40.14px',
                          cursor: 'pointer',
                          borderRadius: 0,
                        }}
                        onClick={captchaImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              ????????????
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              onClick={() => {
                history.push('/user/resetPassword');
                return false;
              }}
            >
              ????????????
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
