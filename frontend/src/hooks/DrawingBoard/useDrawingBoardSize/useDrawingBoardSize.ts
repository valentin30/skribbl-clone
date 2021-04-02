import { useEffect, useRef, useState } from 'react'

interface DrawingBoardSize {
    width: number
    height: number
    container: React.MutableRefObject<HTMLDivElement | null>
    controller: React.MutableRefObject<HTMLDivElement | null>
}

export const useDrawingBoardSize = (): DrawingBoardSize => {
    const ref = useRef<HTMLDivElement | null>(null)
    const controllRef = useRef<HTMLDivElement | null>(null)

    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        setWidth(ref.current?.clientWidth ?? 0)
        setHeight(
            (ref.current?.clientHeight ?? 0) -
                (controllRef.current?.clientHeight ?? 0)
        )

        const resizeHandler = () => {
            setWidth(ref.current?.clientWidth ?? 0)
            setHeight(
                (ref.current?.clientHeight ?? 0) -
                    (controllRef.current?.clientHeight ?? 0)
            )
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return {
        width,
        height,
        container: ref,
        controller: controllRef
    }
}
