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

export function getPost({ select }) {
  return request({
    url: '/api/admin/community/post?select=' + select,
    method: 'get'
  })
}

export function setStatus(data) {
  return request({
    url: '/api/admin/community/status',
    method: 'post',
    data
  })
}

export function getCommentList({ select }) {
  return request({
    url: '/api/admin/community/comment_list?select=' + select,
    method: 'get'
  })
}

export function setUp(data) {
  return request({
    url: '/api/admin/community/setup',
    method: 'post',
    data
  })
}
