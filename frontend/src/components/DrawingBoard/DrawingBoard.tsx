import React, { FunctionComponent } from 'react'
import styles from './DrawingBoard.module.css'
import Canvas, { CanvasDrawProps } from 'react-canvas-draw'
import { Input } from '@material-ui/core'

interface Props {}

const defaultProps: CanvasDrawProps = {
    lazyRadius: 0,
    hideGrid: true
}

export const DrawingBoard: FunctionComponent<Props> = props => {
    return (
        <>
            <Canvas
                {...defaultProps}
                style={{ backgroundColor: 'black' }}
                canvasWidth={800}
                canvasHeight={545}
            />
        </>
    )
}
