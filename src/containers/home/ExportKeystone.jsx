import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd-mobile'
import PasswordForm from './PasswordForm'
import BaseTip from '../../component/layout/BaseTip'
import BaseLabel from '../../component/layout/BaseLabel'
import Copier from '../../component/Copier'
// import PageSpin from '../../component/layout/PageSpin'
import styles from './ExportKeystone.scss'

const UserDetail = function(props) {
  const addrCopyRef = React.createRef()
  const privateCopyRef = React.createRef()
  const [passwd, setPasswd] = useState('')
  const {
    visible,
    onClose,
    user: { addr },
    keystone: { privateKey, isDownloadLoading, isExportLoading },
    dispatch
  } = props
  const handleFetchKeystone = values => {
    const { password: passwd } = values
    setPasswd(passwd)
    dispatch({
      type: 'keystone/getPrivateKey',
      payload: {
        addr,
        passwd
      }
    })
  }
  const handleFetchKeystoneJson = () => {
    dispatch({
      type: 'keystone/getPrivateJson',
      payload: {
        passwd,
        privatekey: privateKey
      }
    })
  }
  const handleClose = () => {
    onClose()
    //关闭窗口时重置状态，下次打开需重新输入密码获取
    dispatch({
      type: 'keystone/setPrivateKey',
      payload: null
    })
    //清空获取到的私钥json，下次打开需重新获取
    dispatch({
      type: 'keystone/setPrivateJson',
      payload: null
    })
  }
  return (
    <Modal
      visible={visible}
      transparent
      title="导出私钥"
      closable={true}
      maskClosable={true}
      onClose={handleClose}
      className={styles.detail}
      wrapClassName={styles.wrap}
    >
      {/* <PageSpin spinning={isDownloadLoading} /> */}
      <div className={styles.cont}>
        {privateKey ? (
          <Fragment>
            <div className={styles.title}>
              <BaseLabel>地址</BaseLabel>
              <Copier text={addr} ref={addrCopyRef}>
                <a href="javascript:">复制地址</a>
              </Copier>
            </div>
            <div className={styles.addr}>{addr}</div>
            <div className={styles.title}>
              <BaseLabel>私钥</BaseLabel>
              <span>
                {isDownloadLoading ? (
                  <span>文件准备中...</span>
                ) : (
                  <a href="javascript:" onClick={handleFetchKeystoneJson}>
                    下载JSON文件
                  </a>
                )}
                <Copier text={privateKey} ref={privateCopyRef}>
                  <a href="javascript:">复制私钥</a>
                </Copier>
              </span>
            </div>
            <div className={styles.code}>{privateKey}</div>
            <BaseTip
              className={styles.tips}
              tips={[
                '注意',
                '永远不要公开这个私钥。任何拥有你的私钥的人都可以窃取你地址上的资产。'
              ]}
            />
            <Button type="primary" onClick={handleClose}>
              完成
            </Button>
          </Fragment>
        ) : (
          <PasswordForm
            onCancel={onClose}
            onOk={handleFetchKeystone}
            loading={isExportLoading}
          />
        )}
      </div>
    </Modal>
  )
}

export default connect(({ user, keystone }) => ({
  user,
  keystone
}))(UserDetail)
