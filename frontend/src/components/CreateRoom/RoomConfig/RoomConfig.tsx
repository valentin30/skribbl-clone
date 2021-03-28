import { Button } from '@material-ui/core'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { socket } from '../../../Socket/Socket'
import {
    CreateRoomPayload,
    ICreateRoomPayload
} from '../../../types/dto/payload/CreateRoomPayload'
import { CREATE_ROOM } from '../../../utils/events'
import { CustomDictionary } from './CustomDictionary'
import { Word } from './CustomDictionary/CustomDictionary'
import { RoomSettings } from './RoomSettings'
import { defaultSelectState, SelectState } from './RoomSettings/RoomSettings'

interface Props {
    onStepChange: React.Dispatch<React.SetStateAction<number>>
}

const canGoToNextStep = (
    selectState: SelectState,
    switchState: boolean,
    dictionary: Word[]
): boolean => {
    if (Object.values(selectState).includes('')) {
        return false
    }

    if (switchState && dictionary.length < 3) {
        return false
    }

    return true
}

export const RoomConfig: FunctionComponent<Props> = props => {
    const { onStepChange } = props

    const selectState = useState<SelectState>(defaultSelectState)
    const dictionaryState = useState<Word[]>([])
    const switchState = useState<boolean>(false)

    const nextStepHandler = useCallback(async () => {
        const canGo: boolean = canGoToNextStep(
            selectState[0],
            switchState[0],
            dictionaryState[0]
        )

        if (!canGo) {
            return
        }

        socket.emit(
            CREATE_ROOM,
            new CreateRoomPayload(selectState[0] as ICreateRoomPayload)
        )

        onStepChange(1)
    }, [selectState, dictionaryState, switchState, onStepChange])

    return (
        <>
            <RoomSettings state={selectState} />
            <CustomDictionary
                dictionaryState={dictionaryState}
                switchState={switchState}
            />
            <Button
                onClick={nextStepHandler}
                color='primary'
                variant='contained'
                size='large'
                type='button'
                fullWidth>
                Next
            </Button>
        </>
    )
}
