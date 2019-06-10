import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { Form, Input } from 'antd'
import CommonPadding from '../component/layout/CommonPadding'
import Header from '../component/layout/Header'
import BaseLabel from '../component/layout/BaseLabel'
import paths from '../utils/paths'
import styles from './Send.scss'

const FormItem = Form.Item
const TexeArea = Input.TextArea

const SendForm = Form.create({ name: 'login' })(props => {
  const {
    form,
    user: { addr, accountBalance },
    price: { vntToCny }
  } = props
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values) //eslint-disable-line
      }
    })
  }
  return (
    <Form hideRequiredMark={true} {...formItemLayout} onSubmit={handleSubmit}>
      <FormItem label={<BaseLabel label={'来自:'} />}>
        <span className={styles.value}>{addr}</span>
        <span className={styles.info}>{`${accountBalance} VNT`}</span>
        <span className={styles.info}>{`￥ ${accountBalance * vntToCny}`}</span>
      </FormItem>
      <FormItem
        label={<BaseLabel style={{ lineHeight: '.4rem' }} label={'发送至：'} />}
      >
        {getFieldDecorator('to', {
          rules: [{ required: true, message: '请输入接收地址' }]
        })(<Input type="password" placeholder="请输入接收地址" size="large" />)}
      </FormItem>
      <FormItem
        label={<BaseLabel style={{ lineHeight: '.4rem' }} label={'数量：'} />}
      >
        {getFieldDecorator('to', {
          rules: [{ required: true, message: '请输入数量' }]
        })(<Input type="number" placeholder="请输入发送数量" size="large" />)}
      </FormItem>
      <FormItem label={<BaseLabel label={'手续费:'} />}>
        <div className={styles.between}>
          <span className={styles.commission}>
            <span className={styles.value}>{`111111 VNT`}</span>
            <span className={styles.info}>{`￥ 111`}</span>
          </span>
          <Link to={paths.commission}>自定义</Link>
        </div>
      </FormItem>
      <FormItem
        label={
          <BaseLabel style={{ lineHeight: '.4rem' }} label={'备注数据：'} />
        }
      >
        {getFieldDecorator('remind')(
          <TexeArea placeholder="请填写交易备注数据，非必填。" size="large" />
        )}
      </FormItem>
      <Button type="primary" onClick={handleSubmit}>
        发送
      </Button>
    </Form>
  )
})

const Send = function(props) {
  const { user, price } = props
  return (
    <Fragment>
      <Header title={'发送VNT'} hasBack={true} />
      <div className={styles.container}>
        <CommonPadding>
          <SendForm user={user} price={price} />
        </CommonPadding>
      </div>
    </Fragment>
  )
}

export default connect(({ user, price }) => ({
  user,
  price
}))(Send)
