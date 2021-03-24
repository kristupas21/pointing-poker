import { BrowserType, OSType } from './types';

const ua = navigator.userAgent.toLowerCase();

export function isIE(): boolean {
  return ua.indexOf('msie ') > -1 || ua.indexOf('trident/') > -1;
}

export function isMacOS(): boolean {
  return ua.indexOf('mac os x') > -1;
}

export function isWindowsOS(): boolean {
  return ua.indexOf('windows') > -1;
}

export function isLinuxOS(): boolean {
  return ua.indexOf('linux') > -1;
}

export function isSafari(): boolean {
  return ua.indexOf('safari') > -1 && ua.indexOf('chrome') < 0;
}

export function isFirefox(): boolean {
  return ua.indexOf('firefox') > -1;
}

export function isChrome(): boolean {
  return ua.indexOf('chrome') > -1;
}

export function isEdge(): boolean {
  return ua.indexOf('edge/') > -1;
}

export function getOS(): OSType {
  if (isMacOS()) {
    return OSType.Mac;
  }

  if (isLinuxOS()) {
    return OSType.Linux;
  }

  return OSType.Windows;
}

export function getBrowser(): BrowserType {
  if (isIE()) {
    return BrowserType.IE;
  }

  if (isFirefox()) {
    return BrowserType.Firefox;
  }

  if (isEdge()) {
    return BrowserType.Edge;
  }

  if (isSafari()) {
    return BrowserType.Safari;
  }

  return BrowserType.Chrome;
}
