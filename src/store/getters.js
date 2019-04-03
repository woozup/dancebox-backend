const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  session_token: state => state.admin.session_token,
  avatar: state => state.admin.avatar,
  name: state => state.admin.name,
  roles: state => state.admin.roles
}
export default getters
