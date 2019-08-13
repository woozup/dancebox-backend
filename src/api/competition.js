import request from '@/utils/request'

export function createCompetition(data) {
  return request({
    url: '/api/competition',
    method: 'post',
    data
  })
}

export function getCompetitionList(activity_id) {
  return request({
    url: `/api/competition?activity_id=${activity_id}`,
    method: 'get'
  })
}

export function getCompetitionDetail(id) {
  return request({
    url: `/api/competition?id=${id}`,
    method: 'get'
  })
}

export function deleteCompetition(activity_id, id) {
  return request({
    url: `/api/competition/${activity_id}/${id}`,
    method: 'delete'
  })
}
