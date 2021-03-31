import { useRef } from 'react'
import CanvasDraw from 'react-canvas-draw'

interface DrawingBoard {
    ref: React.MutableRefObject<CanvasDraw | null>
    canvas: CanvasDraw | null
}

export const useDrawingBoard = (): DrawingBoard => {
    const ref = useRef<CanvasDraw | null>(null)

    return {
        ref,
        canvas: ref.current
    }
}
