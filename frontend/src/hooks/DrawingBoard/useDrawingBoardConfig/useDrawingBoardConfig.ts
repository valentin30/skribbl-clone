import { useCallback, useMemo } from 'react'
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw'
import { JsxEmit } from 'typescript'
import { socket } from '../../../Socket/Socket'
import { DrawingPayload } from '../../../types/dto/payload/DrawingPayload'
import { DRAWING } from '../../../utils/events'
import { useDisabled } from '../../Room/useDisabled'
import { useDrawingBoardControlls } from '../useDrawingBoardControlls'
import {
    DrawingBoardMethods,
    DrawingBoardState
} from '../useDrawingBoardControlls/useDrawingBoardControlls'

interface Config {
    canvasRef: React.MutableRefObject<CanvasDraw | null>
    state: DrawingBoardState
    methods: DrawingBoardMethods
    config: CanvasDrawProps
}

export const useDrawingBoardConfig = (): Config => {
    const {
        canvasRef,
        methods,
        state: { color, radius, selected }
    } = useDrawingBoardControlls()

    const { disabled } = useDisabled()

    const onChange = useCallback((canvas: CanvasDraw) => {
        socket.emit(DRAWING, new DrawingPayload(canvas.getSaveData()))
    }, [])

    const brushColor = useMemo<string>(
        () => (selected === 'ERASER' ? '#FFFFFF' : color),
        [selected, color]
    )

    const brushRadius = useMemo<number>(
        () => (selected === 'ERASER' ? radius * 4 : radius),
        [selected, radius]
    )

    return {
        canvasRef,
        state: {
            color,
            radius,
            selected
        },
        methods,
        config: {
            disabled,
            lazyRadius: 0,
            hideGrid: true,
            brushColor,
            canvasHeight: 550,
            catenaryColor: brushColor,
            brushRadius,
            immediateLoading: true,
            loadTimeOffset: 0,
            hideInterface: true,
            onChange: disabled ? undefined : onChange
        }
    }
}
