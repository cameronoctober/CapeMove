declare module '*.svg';
declare module '*.png';
declare global {
  interface Window {
    __SENTRY__?: any;
  }
}
export {};
