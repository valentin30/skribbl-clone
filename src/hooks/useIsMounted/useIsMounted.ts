import { useEffect, useRef } from 'react'

export const useIsMounted = (): React.MutableRefObject<boolean> => {
    const isMounted = useRef<boolean>(true)

    useEffect((): (() => void) => {
        return () => (isMounted.current = false)
    }, [])

    return isMounted
}
