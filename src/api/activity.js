import request from '@/utils/request'

export function create(params) {
  return request({
    url: '/api/activity',
    method: 'post',
    params
  })
}
