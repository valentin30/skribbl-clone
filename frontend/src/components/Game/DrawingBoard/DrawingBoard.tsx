import { Card, CardContent } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import Canvas from 'react-canvas-draw'
import { useDrawingBoardConfig } from '../../../hooks/DrawingBoard/useDrawingBoardConfig'
import { useDrawingDisabled } from '../../../hooks/Room/useDisabled'
import { ControllButton } from '../../UI/Button/ControllButton'
import { Brush } from '../../UI/Icon/Brush'
import { Eraser } from '../../UI/Icon/Eraser'
import { Undo } from '../../UI/Icon/Undo'
import { Colors } from './Colors'
import styles from './DrawingBoard.module.scss'
import { Sizes } from './Sizes'

interface Props {}

export const DrawingBoard: FunctionComponent<Props> = props => {
    const { disabled } = useDrawingDisabled()

    const {
        refs: { canvasRef, containerRef, controllsRef },
        config,
        state: { color, radius, selected },
        methods: {
            selectColorHandler,
            selectBrushHandler,
            selectEraserHandler,
            selectSizeHandler,
            undoHandler,
            clearHandler
        }
    } = useDrawingBoardConfig()

    return (
        <Card ref={containerRef} className={styles.root} variant='outlined'>
            <CardContent ref={controllsRef}>
                <Colors
                    onColorChange={selectColorHandler}
                    disabled={disabled}
                />
                <div className={styles.Controls}>
                    <div>
                        <Sizes
                            size={radius}
                            onSizeChange={selectSizeHandler}
                            disabled={disabled}
                        />
                    </div>
                    <ControllButton
                        onClick={selectBrushHandler}
                        value='BRUSH'
                        selected={selected === 'BRUSH' && !disabled}
                        disabled={disabled}
                        tooltip='Brush'>
                        <Brush color={color} />
                    </ControllButton>
                    <ControllButton
                        onClick={selectEraserHandler}
                        selected={selected === 'ERASER' && !disabled}
                        disabled={disabled}
                        value='ERASER'
                        tooltip='Eraser'>
                        <Eraser />
                    </ControllButton>
                    <ControllButton
                        value='UNDO'
                        onClick={undoHandler}
                        disabled={disabled}
                        tooltip='Undo'>
                        <Undo />
                    </ControllButton>
                    <ControllButton
                        value='REMOVE'
                        onClick={clearHandler}
                        disabled={disabled}
                        tooltip='Remove'>
                        <Delete />
                    </ControllButton>
                </div>
            </CardContent>
            <Canvas ref={canvasRef} {...config} />
        </Card>
    )
}
