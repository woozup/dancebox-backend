import request from '@/utils/request'

export function login(email, password) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/admin/info',
    method: 'get',
    header: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
