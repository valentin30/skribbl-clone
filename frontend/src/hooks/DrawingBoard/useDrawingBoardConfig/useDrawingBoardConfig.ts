import { useCallback, useEffect, useMemo, useState } from 'react'
import CanvasDraw, { CanvasDrawProps } from 'react-canvas-draw'
import { socket } from '../../../Socket/Socket'
import { DrawingData } from '../../../types/dto/data/DrawingData'
import { DrawingPayload } from '../../../types/dto/payload/DrawingPayload'
import { DEFAULT_DRAWING } from '../../../utils/constants'
import { DRAWING } from '../../../utils/events'
import { useDrawingDisabled } from '../../Room/useDisabled'
import { useDrawingBoardControlls } from '../useDrawingBoardControlls'
import {
    DrawingBoardMethods,
    DrawingBoardState
} from '../useDrawingBoardControlls/useDrawingBoardControlls'
import { useDrawingBoardSize } from '../useDrawingBoardSize'

interface Config {
    refs: Refs
    state: DrawingBoardState
    methods: DrawingBoardMethods
    config: CanvasDrawProps
}

interface Refs {
    canvasRef: React.MutableRefObject<CanvasDraw | null>
    containerRef: React.MutableRefObject<HTMLDivElement | null>
    controllsRef: React.MutableRefObject<HTMLDivElement | null>
}

export const useDrawingBoardConfig = (): Config => {
    const {
        canvasRef,
        methods,
        state: { color, radius, selected }
    } = useDrawingBoardControlls()

    const { container, controller, height, width } = useDrawingBoardSize()

    const { disabled } = useDrawingDisabled()

    const onChange = useCallback(
        (canvas: CanvasDraw) => {
            if (disabled) {
                return
            }

            socket.emit(DRAWING, new DrawingPayload(canvas.getSaveData()))
        },
        [disabled]
    )

    const brushColor = useMemo<string>(
        () => (selected === 'ERASER' ? '#FFFFFF' : color),
        [selected, color]
    )

    const brushRadius = useMemo<number>(
        () => (selected === 'ERASER' ? radius * 4 : radius),
        [selected, radius]
    )

    useEffect(() => {
        socket.on(DRAWING, ({ drawing }: DrawingData) => {
            canvasRef.current?.loadSaveData(drawing)
        })

        return () => {
            socket.off(DRAWING)
        }
    }, [canvasRef])

    return {
        refs: {
            canvasRef,
            containerRef: container,
            controllsRef: controller
        },
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
            catenaryColor: brushColor,
            brushRadius,
            immediateLoading: true,
            loadTimeOffset: 0,
            hideInterface: true,
            canvasHeight: height,
            canvasWidth: width,
            onChange
        }
    }
}
