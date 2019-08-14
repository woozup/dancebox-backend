import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/api/admin/users',
    method: 'get'
  })
}

export function putStatus() {
}
