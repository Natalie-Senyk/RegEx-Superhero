// currently used only as Confetti setter when the answer is correct

export const setTimeEvent = (callback: (name: boolean) => void) => {
   setTimeout(() => callback(true), 0)
  window.location.pathname !== '/' && callback(false)
}


