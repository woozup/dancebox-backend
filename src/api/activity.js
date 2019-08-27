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

export function getDetail(id) {
  return request({
    url: `/api/admin/activity?id=${id}`,
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

export function createPersonal({ name, type, img }) {
  return request({
    url: '/api/admin/personal',
    method: 'post',
    data: {
      name,
      type,
      img
    }
  })
}
export function getPersonal(type) {
  return request({
    url: '/api/admin/personal?type=' + type,
    method: 'get'
  })
}

export function deletePersonal(id) {
  return request({
    url: '/api/admin/personal?id=' + id,
    method: 'delete'
  })
}

export function createGame(data) {
  return request({
    url: '/api/admin/game',
    method: 'post',
    data
  })
}

export function createTeach(data) {
  return request({
    url: '/api/admin/teach',
    method: 'post',
    data
  })
}

/**
 * @desc 获取全部选手
 * @param {String/Number} activity_id
 * @return {Promise} 
 */
export function getPlayersList(activity_id){
  return request({
    url: '/api/player'
    ,params: {
      activity_id
    }
  })
  .catch(()=>{
    return {
      "success": true,
      "players": [{
        "id": 1,
        "name": "test_player_update",
        "phone": "12345678910",
        "number": "003",
        "project_id": 1,
        "project_name": "test_project_update",
        "competition_id": 3,
        "competition_name": "test_competition_update",
        "group_id": 3,
        "group_name": "test_competition_group_name_2"
      }]
    }
  })
}

/**
 * @desc 创建选手
 * @param {String} name 选手名
 * @param {String} phone 手机号
 * @param {String} number 号码牌
 * @param {Number} project_id 项目id
 * @param {Number} activity_id 活动id
 * @param {Number} competition_id 赛制id
 * @return {Promise} 
 */
export function createPlayer({
  name
  ,phone
  ,number
  ,project_id
  ,activity_id
  ,competition_id
}){
  return request({
    url: `/api/player`
    ,method: 'post'
    ,data: {
      name
      ,phone
      ,number
      ,project_id
      ,activity_id
      ,competition_id
    }
  })
  // .catch(()=>{
  //   return {
  //     "name": "test_player",
  //     "phone": "12345678901",
  //     "number": "001",
  //     "project_id": 1,
  //     "activity_id": 1,
  //     "competition_id": 1
  //   }
  // })
}

/**
 * @desc 获取单个选手
 * @param {String} player_id
 * @return {Promise} 
 */
export function getPlayerInfo(player_id){
  return request({
    url: `/api/player/${player_id}`
  })
  .catch(()=>{
    return {
      "success": true,
      "player": {
        "id": 1,
        "name": "test_player_update",
        "phone": "12345678910",
        "number": "003",
        "activity_id": 251,
        "project_id": 1,
        "project_name": "test_project_update",
        "competition_id": 3,
        "competition_name": "test_competition_update",
        "group_id": 3,
        "group_name": "test_competition_group_name_2"
      }
    }
  })
}

/**
 * @desc 验证号码牌
 * @param {String} number	号码牌
 * @param {Number} project_id 项目id
 * @param {Number} activity_id 活动id
 * @param {Number} competition_id 赛制id
 * @return {Promise} 
 */
export function checkPlayerNumber({
  number
  ,project_id
  ,activity_id
  ,competition_id
}){
  return request({
    url: `/api/player/check`
    ,method: 'post'
    ,data: {
      number
      ,project_id
      ,activity_id
      ,competition_id
    }
  })
  .catch(()=>{
    return {
      "success": true,
      "allow": true
    }
  })
}

/**
 * @desc 获取全部裁判账号
 */
export function getActivityReferees(activity_id){
  return request({
    url: '/referee/account'
    ,params: {
      activity_id
    }
  })
  .catch(()=>{
    return {
      "success": true,
      "referee_accounts": [{
        "id": 1,
        "username": "test_referee_account",
        "referee_id": 1,
        "referee_name": "test_referee_name",
        "groups": [{
          "group_id": 1,
          "group_name": "test_competition_group_name"
        }]
      }]
    }
  })
}
