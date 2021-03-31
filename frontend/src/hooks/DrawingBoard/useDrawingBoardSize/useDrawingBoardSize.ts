import { useEffect, useRef, useState } from 'react'

interface DrawingBoardSize {
    width: number
    container: React.MutableRefObject<HTMLDivElement | null>
}

export const useDrawingBoardSize = (): DrawingBoardSize => {
    const ref = useRef<HTMLDivElement | null>(null)

    const [width, setWidth] = useState<number>(0)

    useEffect(() => {
        setWidth(ref.current?.clientWidth ?? 0)

        const resizeHandler = () => {
            setWidth(ref.current?.clientWidth ?? 0)
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return {
        width,
        container: ref
    }
}
