import { useCallback, useEffect, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { socket } from '../../../Socket/Socket'
import { DrawingData } from '../../../types/dto/data/DrawingData'
import { DrawingPayload } from '../../../types/dto/payload/DrawingPayload'
import { DEFAULT_DRAWING } from '../../../utils/constants'
import { DRAWING } from '../../../utils/events'
import { useDrawingBoard } from '../useDrawingBoard/useDrawingBoard'

export type Selected = 'BRUSH' | 'ERASER'

export interface DrawingBoardControlls {
    canvasRef: React.MutableRefObject<CanvasDraw | null>
    state: DrawingBoardState
    methods: DrawingBoardMethods
}

export interface DrawingBoardState {
    color: string
    radius: number
    selected: Selected
}

export interface DrawingBoardMethods {
    selectBrushHandler: () => void
    selectEraserHandler: () => void
    selectColorHandler: (color: string) => void
    selectSizeHandler: (size: number) => void
    undoHandler: () => void
    clearHandler: () => void
}

export const useDrawingBoardControlls = (): DrawingBoardControlls => {
    const { canvas, ref } = useDrawingBoard()

    const [color, setColor] = useState<string>('')
    const [radius, setRadius] = useState<number>(4)
    const [selected, setSelected] = useState<Selected>('BRUSH')

    const selectBrushHandler = useCallback(() => {
        if (selected === 'BRUSH') {
            return
        }

        setSelected('BRUSH')
    }, [selected])

    const selectEraserHandler = useCallback(() => {
        if (selected === 'ERASER') {
            return
        }

        setSelected('ERASER')
    }, [selected])

    const selectColorHandler = useCallback(
        (color: string) => {
            selectBrushHandler()
            setColor(color)
        },
        [selectBrushHandler]
    )

    const undoHandler = useCallback(() => {
        canvas?.undo()
    }, [canvas])

    const clearHandler = useCallback(() => {
        socket.emit(DRAWING, new DrawingPayload(DEFAULT_DRAWING))
        canvas?.clear()
    }, [canvas])

    useEffect(() => {
        socket.on(DRAWING, ({ drawing }: DrawingData) => {
            canvas?.loadSaveData(drawing, true)
        })

        return () => {
            socket.off(DRAWING)
        }
    }, [canvas])

    return {
        canvasRef: ref,
        state: {
            color,
            radius,
            selected
        },
        methods: {
            clearHandler,
            selectBrushHandler,
            selectColorHandler,
            selectEraserHandler,
            undoHandler,
            selectSizeHandler: setRadius
        }
    }
}
