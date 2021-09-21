
export const setTimeEvent = (callback: (name: boolean) => void) => {
   setTimeout(() => callback(true), 0)
  window.location.pathname === '/progress' && callback(false)
}


