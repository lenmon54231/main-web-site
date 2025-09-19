import type { UserModule } from '~/types'
import { getStorage } from '~/utils/common'

export const install: UserModule = ({ router }) => {
  /* 白名单 */
  const whiteList = ['/login', '/register', '/']

  router.beforeEach((to) => {
    const token = getStorage('token')

    // 已登录但还在登录页，就回家
    if (token && to.path === '/login')
      return '/'

    // 未登录且不在白名单 → 去登录
    if (!token && !whiteList.includes(to.path)) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    }
  })
}
