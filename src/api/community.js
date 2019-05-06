import request from '@/utils/request'

// /admin/community/topic

export function addTopic(data) {
  return request({
    url: '/api/admin/community/topic',
    method: 'post',
    data
  })
}

export function getTopics() {
  return request({
    url: '/api/admin/community/topics',
    method: 'get'
  })
}

export function getPost() {
  return request({
    url: '/api/admin/community/post',
    method: 'get'
  })
}
