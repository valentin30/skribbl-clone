import { Card, CardContent, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import Canvas, { CanvasDrawProps } from 'react-canvas-draw'
import { Colors } from '../Game/Colors'
import { Sizes } from '../Game/Sizes'
import { ControllButton } from '../UI/Button/ControllButton'
import { Brush } from '../UI/Icon/Brush'
import { Eraser } from '../UI/Icon/Eraser'
import { Undo } from '../UI/Icon/Undo'
import styles from './DrawingBoard.module.scss'

interface Props {}

const defaultProps: CanvasDrawProps = {
    lazyRadius: 0,
    hideGrid: true
}

type Selected = 'BRUSH' | 'ERASER'

export const DrawingBoard: FunctionComponent<Props> = props => {
    const [color, setColor] = useState<string>('')
    const [radius, setRadius] = useState<number>(4)
    const [selected, setSelected] = useState<Selected>('BRUSH')

    const rootRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<Canvas | null>(null)

    const [width, setWidth] = useState<number>(
        rootRef.current?.clientWidth ?? window.innerWidth
    )

    const brushColor = useMemo<string>(
        () => (selected === 'ERASER' ? '#FFFFFF' : color),
        [selected, color]
    )

    const brushRadius = useMemo<number>(
        () => (selected === 'ERASER' ? radius * 4 : radius),
        [selected, radius]
    )

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
        canvasRef.current?.undo()
    }, [])

    const clearHandler = useCallback(() => {
        canvasRef.current?.clear()
    }, [])

    useEffect(() => {
        setWidth(rootRef.current?.clientWidth ?? 0)

        const resizeHandler = () => {
            setWidth(rootRef.current?.clientWidth ?? 0)
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <Card ref={rootRef} className={styles.root} variant='outlined'>
            <CardContent>
                <Colors onColorChange={selectColorHandler} />
                <div className={styles.Controls}>
                    <div>
                        <Sizes size={radius} onSizeChange={setRadius} />
                    </div>
                    <ControllButton
                        onClick={selectBrushHandler}
                        value='BRUSH'
                        selected={selected === 'BRUSH'}
                        tooltip='Brush'>
                        <Brush color={color} />
                    </ControllButton>
                    <ControllButton
                        onClick={selectEraserHandler}
                        selected={selected === 'ERASER'}
                        value='ERASER'
                        tooltip='Eraser'>
                        <Eraser />
                    </ControllButton>
                    <ControllButton
                        value='UNDO'
                        onClick={undoHandler}
                        tooltip='Undo'>
                        <Undo />
                    </ControllButton>
                    <ControllButton
                        value='REMOVE'
                        onClick={clearHandler}
                        tooltip='Remove'>
                        <Delete />
                    </ControllButton>
                </div>
            </CardContent>
            <Canvas
                ref={canvasRef}
                canvasWidth={width}
                canvasHeight={550}
                brushColor={brushColor}
                catenaryColor={brushColor}
                brushRadius={brushRadius}
                {...defaultProps}
            />
        </Card>
    )
}
