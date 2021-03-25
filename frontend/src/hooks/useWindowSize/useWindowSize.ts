import { useEffect, useState } from 'react'

interface Size {
    height: number
    width: number
}

export const useWindowSize = (): Size => {
    const [size, setSize] = useState<Size>({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        const resizeHandler = () => {
            setSize({ height: window.innerHeight, width: window.innerWidth })
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return size
}
