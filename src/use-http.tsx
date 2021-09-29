import { useCallback, useState } from "react"

type useHttpUrlProps = {
  url: string
}

type useHttpOptionsProps = {
    method?: string 
    headers?: {
      "Content-Type": string
    }
    body?: string
}

type userData = {
    currentLevel: number,
    numberOfGuessedWords: number
}

const useHttp = ( applyData: (data: userData) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  const sendRequest = useCallback(async (requestConfig: useHttpUrlProps, options?: useHttpOptionsProps) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(requestConfig.url, {
        method: options!.method ? options!.method : 'GET',
        headers: options!.headers ? options!.headers : {},
        body: options!.body ? JSON.stringify(options!.body) : null
      })

      if (!response.ok) {
        throw new Error("Request failed!")
      }

      const data = await response.json()
      applyData(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong!")
    }
    setIsLoading(false)
  }, [applyData])
  return {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp



// const transformData = useCallback((userDataObj) => {
//     setCurLevel(userDataObj.currentLevel)
//     // setGuessedWords(userDataObj.numberOfGuessedWords)
//   }, [])


//   const {sendRequest: fetchUserData} = useHttp(transformData)
 
 
//   useEffect(() => {
//     fetchUserData({url: "https://regex-superhero-default-rtdb.firebaseio.com/userData.json"})
//   }, [fetchUserData])