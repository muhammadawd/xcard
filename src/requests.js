import helper from './filters/helper'


export default {
  BASE: process.env.VUE_APP_API,

  REFRESH_ACCESS_TOKEN: '',
  AUTH_JWT_LOGIN_ADMIN: '/admin/login',

  COMMON_STATUS: '/common/getStatus',
  COMMON_VEHICLES: '/common/getVehicleCommon',
  COMMON_GET_ALL_SETTINGS: '/common/getSetting',
  COMMON_UPDATE_SETTINGS: '/common/updateSetting',


  ADD_USER: '/user/create',
  ALL_USER: `/user`,
  FIND_USER: `/user/find`,
  UPDATE_USER: '/user/update',
  DELETE_USER: '/user/delete',

  ADD_BRANCH: '/branch/create',
  ALL_BRANCH: `/branch`,
  FIND_BRANCH: `/branch`,
  UPDATE_BRANCH: '/branch/update',
  DELETE_BRANCH: '/branch/delete',

  ADD_ROLES: '/admin/role/create-update',
  ALL_ROLES: `/admin/role/1`,
  FIND_ROLES: `/admin/role/1`,
  UPDATE_ROLES: '/admin/role/create-update',
  DELETE_ROLES: '/admin/role/delete',
  ALL_PERMISSIONS: 'admin/role/permissions',


  ADD_ADMIN: '/admin/create',
  ALL_ADMINS: `/admin/1`,
  FIND_ADMIN: `/admin/find/1`,
  UPDATE_ADMIN: '/admin/update',
  DELETE_ADMIN: '/admin/delete',

}
