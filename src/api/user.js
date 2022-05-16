// 引入axios
import request from '@/utils/request'

// 对外暴露登陆接口函数
// /admin/acl/index/login
export function login(data) {
  return request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}

// 对外暴露获取用户信息的函数
// /admin/acl/index/info
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// 对外暴露退出登陆的函数
// /admin/acl/index/logout
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
