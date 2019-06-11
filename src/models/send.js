import { effects } from 'redux-sirius'
import { message } from 'antd'
import { push } from 'react-router-redux'
import paths from '../utils/paths'
import {
  signThenSendTransaction,
  getGasPrice,
  getGasLimit
} from '../utils/chrome'
const { put } = effects

export default {
  state: {
    gasPriceDefault: 0,
    gasLimitDefault: 0,
    gasPrice: 0,
    gasLimit: 0,
    price: 0,
    isSendLoading: false
  },
  reducer: {},
  effects: ({ takeLatest }) => ({
    sendTx: takeLatest(function*({ payload }) {
      try {
        yield put({
          type: 'send/setIsSendLoading',
          payload: true
        })
        const id = yield signThenSendTransaction(payload)
        yield put(push(`${paths.txDetail}/${id}`))
      } catch (e) {
        message.error(e.message)
        console.log(e) //eslint-disable-line
      } finally {
        yield put({
          type: 'send/setIsSendLoading',
          payload: false
        })
      }
    }),
    getGasPrice: takeLatest(function*() {
      try {
        const res = yield getGasPrice()
        yield put({
          type: 'send/merge',
          payload: {
            gasPriceDefault: res,
            gasPrice: res
          }
        })
      } catch (e) {
        message.error(e.message)
        console.log(e) //eslint-disable-line
      }
    }),
    getGasLimit: takeLatest(function*() {
      try {
        const res = yield getGasLimit()
        yield put({
          type: 'send/merge',
          payload: {
            gasLimitDefault: res,
            gasLimit: res
          }
        })
      } catch (e) {
        message.error(e.message)
        console.log(e) //eslint-disable-line
      }
    })
  })
}
