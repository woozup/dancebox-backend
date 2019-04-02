import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/api/activity',
    method: 'post',
    data
  })
}
