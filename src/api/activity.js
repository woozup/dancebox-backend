import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/admin/activity',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/api/admin/activitys',
    method: 'get'
  })
}

export function putStatus({ status, id }) {
  return request({
    url: '/api/admin/activity',
    method: 'put',
    data: {
      status,
      id
    }
  })
}
