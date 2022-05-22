import mockRequest from '@/utils/mockRequest'


const state = {
  list: {}
}

const mutations = {
  GETDATA: (state, list) => {
    state.list = list
  }
}

const actions = {
  // 发送请求获取dashbord的mock数据
  getDashbordData({ commit }) {
    return new Promise((resolve, reject) => {
      mockRequest.get('/dashbord/list')
      .then(res => {
        console.log(res)
        commit('GETDATA', res.data)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}


const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}

