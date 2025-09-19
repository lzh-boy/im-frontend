/**
 * @name 代理配置
 * @description 配置开发环境下的API代理规则
 * @see 在生产环境代理无法生效，所以这里没有生产环境的配置
 * @doc https://umijs.org/docs/guides/proxy
 */

// 服务器地址配置
const SERVER_CONFIG = {
  // 统一服务器地址
  BASE_SERVER: 'http://47.83.254.218',
  // 管理后台服务 (端口 10009)
  ADMIN_SERVER: 'http://47.83.254.218:10009',
  // IM 服务 (端口 10002) 
  IM_SERVER: 'http://47.83.254.218:10002',
  // 用户服务 (端口 10008)
  USER_SERVER: 'http://47.83.254.218:10008',
};

// 通用代理配置
const createProxyConfig = (target: string) => ({
  target,
  changeOrigin: true, // 支持跨域
  secure: false, // 如果是https接口，需要配置这个参数
  logLevel: 'debug', // 开发环境显示代理日志
});

export default {
  // 开发环境代理配置
  dev: {
    // ==================== 管理后台服务 (端口 10009) ====================
    '/api/account': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
      pathRewrite: { '^/api': '' },
    },
     // ==================== IM 系统服务 (端口 10002) ====================
     '/api/user/get_users': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/user/get_notification_accounts': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/user/password': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/user/import': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/block': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/default': {
      ...createProxyConfig(SERVER_CONFIG.ADMIN_SERVER),
      pathRewrite: { '^/api': '' },
    },
   
    // ==================== 用户服务 (端口 10008) ====================
    '/api/user': {
      ...createProxyConfig(SERVER_CONFIG.USER_SERVER),
      pathRewrite: { '^/api': '' },
    },

    
    '/api/msg': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/group': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/auth': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/friend': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/third': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
    '/api/object': {
      ...createProxyConfig(SERVER_CONFIG.IM_SERVER),
      pathRewrite: { '^/api': '' },
    },
  },

  // 测试环境代理配置
  test: {
    '/api/': {
      target: SERVER_CONFIG.ADMIN_SERVER,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // 移除 /api 前缀
    },
  },

  // 预发布环境代理配置
  pre: {
    '/api/': {
      target: SERVER_CONFIG.ADMIN_SERVER,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // 移除 /api 前缀
    },
  },
};