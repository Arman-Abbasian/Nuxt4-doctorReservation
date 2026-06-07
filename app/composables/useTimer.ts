export const useTimer = () => {
  //refs
  const remainingSeconds = ref(0)

  //variable
  let timerInterval: ReturnType<typeof setInterval> | null = null

  const formattedTime = computed(() => {
    const minutes = Math.floor(remainingSeconds.value / 60)
    const seconds = remainingSeconds.value % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  const startTimer = (initialSeconds: number) => {
    stopTimer()

    remainingSeconds.value = initialSeconds

    if (remainingSeconds.value <= 0) return

    timerInterval = setInterval(() => {
      if (remainingSeconds.value > 0) {
        remainingSeconds.value--
      }

      if (remainingSeconds.value <= 0) {
        stopTimer()
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  return {
    remainingSeconds,
    formattedTime,
    startTimer,
    stopTimer,
  }
}
