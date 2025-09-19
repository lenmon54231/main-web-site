import UserAgentParser from 'ua-parser-js'

import { ticketUrl, vrUrl } from './const'

declare const window: any
declare const navigator: any

export const device = (() => {
  if (typeof window === 'undefined' || typeof window === 'undefined') {
    return {}
  }
  let supportWebGL
  try {
    const canvas = document.createElement('canvas')
    supportWebGL = !!(
      window.WebGLRenderingContext
      && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    supportWebGL = false
  }

  const supportWebRTC = !!(
    (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    || navigator.getUserMedia
  )

  const {
    browser: { name: browserName },
    os: { name: osName },
  } = new UserAgentParser().getResult()

  const ua = navigator.userAgent

  // iPadOS 会模拟MAC的信息。用特殊方法检测。
  const isIPad
    = osName === 'Mac OS'
      && undefined === window.safari
      && undefined !== navigator.standalone
  return {
    supportWebGL,
    supportWebRTC,

    isIos: osName === 'iOS' || isIPad,
    // isAndroid: osName === "Android",
    isAndroid: osName === 'Android' || osName === 'android',
    isWechat: browserName === 'WeChat',
    isQQ: browserName === 'QQ',
    isWeibo: /weibo/i.test(ua),
    isSafari:
      browserName === 'Mobile Safari' || (isIPad && browserName === 'Safari'),
    isUc: browserName === 'UCBrowser',
    isLine: /line\//i.test(ua),
    isQQBrowser: browserName === 'QQBrowser',
    isChrome: browserName === 'Chrome',
    isFirfox: browserName === 'Firefox',
    isFacebook: browserName === 'Facebook',
    isInstagram: /instagram/i.test(ua),
    isTbsKernel: /MQQBrowser\/.*tbs/i.test(ua),
    isXWebKernel: /XWEB\/.*MMWEBSDK/i.test(ua),
    isJdApp: /jdapp/i.test(ua),
    isXHS: /xhsminiapp/i.test(ua),
    isSafariOrChrome:
      !!(browserName === 'Mobile Safari'
        || (isIPad && browserName === 'Safari')
        || browserName === 'Chrome'),
    isPC: !(
      osName === 'Android'
      || osName === 'android'
      || osName === 'iOS'
      || isIPad
    ),
  }
})()

export function getCurrentEnv(): Promise<string> {
  return new Promise((resolve) => {
    if (device.isIos || device.isAndroid) {
      resolve('h5')
    }
    else {
      resolve('pc')
    }
  })
}

export function cutFullStringDate(date: string) {
  let cut = date
  if (date) {
    cut = date.substring(0, 10)
  }
  return cut
}

export function containsDebug(url: string | URL) {
  try {
    const urlObj = new URL(url)
    const searchParams = new URLSearchParams(urlObj.search)
    return searchParams.has('debug')
  }
  catch (error) {
    console.error('Invalid URL', error)
    return false
  }
}

export function buyTicket() {
  window.open(ticketUrl, '_blank')
}

export function toPanorama() {
  window.open(vrUrl, '_blank')
}

export function getStorage(key: string): string | null {
  if (typeof window === 'undefined')
    return null
  return localStorage.getItem(key)
}
