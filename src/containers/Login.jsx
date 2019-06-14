import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, InputItem } from 'antd-mobile'
import { Form, Select } from 'antd'
import styles from './Login.scss'
import Header from '../component/layout/Header'
import CommonPadding from '../component/layout/CommonPadding'
import BaseLabel from '../component/layout/BaseLabel'
import paths from '../utils/paths'
import imgs from '../utils/imgs'
import { netList } from '../constants/net'
const FormItem = Form.Item
const Option = Select.Option

const LoginForm = Form.create({ name: 'login' })(props => {
  const { form, onSubmit, isLoginDisable } = props
  const { getFieldDecorator } = form
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values) //eslint-disable-line
        onSubmit({ passwd: values.password })
      }
    })
  }
  return (
    <Form hideRequiredMark={true} onSubmit={handleSubmit}>
      <FormItem label={<BaseLabel label={'密码'} icon={imgs.password} />}>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: '请输入密码' },
            { min: 8, message: '密码长度不足' }
          ]
        })(<InputItem type="password" placeholder="请输入" />)}
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={handleSubmit} disabled={isLoginDisable}>
          登录
        </Button>
      </FormItem>
    </Form>
  )
})
const Login = function(props) {
  const {
    dispatch,
    user: { isLoginDisable, providerUrl }
  } = props
  const handleLogin = data => {
    dispatch({
      type: 'user/login',
      payload: data
    })
  }
  const handleNetChange = () => {}
  const renderTitle = () => {
    return (
      <Select
        onChange={handleNetChange}
        suffixIcon={<img src={imgs.suffix} alt="" />}
        value={providerUrl}
      >
        {Object.keys(netList).map(key => {
          const item = netList[key]
          return (
            <Option value={item.url} key={key}>
              {item.label}
            </Option>
          )
        })}
      </Select>
    )
  }
  return (
    <Fragment>
      <Header title={renderTitle} theme={'trans'} />
      <div className={styles.banner} />
      <div className={styles.container}>
        <CommonPadding>
          <h2 className={styles.title}>登录VNT钱包</h2>
          <LoginForm onSubmit={handleLogin} isLoginDisable={isLoginDisable} />
          <div className={styles.tip}>
            <p>
              登录另一个钱包？
              <Link to={paths.regainWord}>从助记词恢复钱包</Link>
            </p>
            <p>
              没有钱包？
              <Link to={paths.create}>创建钱包</Link>
            </p>
          </div>
        </CommonPadding>
      </div>
    </Fragment>
  )
}

export default connect(({ user }) => ({ user }))(Login)
