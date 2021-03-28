import { Button } from '@material-ui/core'
import React, { FunctionComponent, useEffect, useRef } from 'react'
import Canvas, { CanvasDrawProps } from 'react-canvas-draw'

interface Props {}

const defaultProps: CanvasDrawProps = {
    lazyRadius: 0,
    hideGrid: true
}

export const DrawingBoard: FunctionComponent<Props> = props => {
    const ref = useRef<Canvas | null>(null)

    return (
        <>
            <Canvas
                ref={ref}
                style={{ backgroundColor: 'black' }}
                canvasWidth={400}
                canvasHeight={350}
                {...defaultProps}
            />
            <Button
                onClick={() => {
                    localStorage.setItem(
                        'draw',
                        ref.current?.getSaveData() ?? ''
                    )
                }}>
                Save
            </Button>
            <Button
                onClick={() => {
                    ref.current?.loadSaveData(
                        localStorage.getItem('draw') || '',
                        true
                    )
                }}>
                Load
            </Button>
            <Button
                onClick={() => {
                    ref.current?.undo()
                }}>
                Undo
            </Button>
        </>
    )
}
