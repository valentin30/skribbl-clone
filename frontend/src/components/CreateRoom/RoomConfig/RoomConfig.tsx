import React, { FunctionComponent, useCallback, useState } from 'react'
import { useSelect } from '../../../hooks/Form/useSelect'
import { socket } from '../../../Socket/Socket'
import {
    CreateRoomPayload,
    ICreateRoomPayload
} from '../../../types/dto/payload/CreateRoomPayload'
import { CREATE_ROOM } from '../../../utils/events'
import { PrimaryButton } from '../../UI/Button/PrimaryButton'
import { CustomDictionary } from './CustomDictionary'
import { Word } from './CustomDictionary/CustomDictionary'
import { RoomSettings } from './RoomSettings'
import { SelectState } from './RoomSettings/RoomSettings'

interface Props {}

export const RoomConfig: FunctionComponent<Props> = props => {
    const dictionaryState = useState<Word[]>([])
    const switchState = useState<boolean>(false)

    const { selectState, changeHandler } = useSelect<SelectState>({
        rounds: '',
        secondsPerRound: ''
    })

    const createRoomHandler = useCallback(() => {
        socket.emit(
            CREATE_ROOM,
            new CreateRoomPayload(selectState as ICreateRoomPayload)
        )
    }, [selectState])

    return (
        <>
            <RoomSettings value={selectState} onChange={changeHandler} />
            <CustomDictionary
                dictionaryState={dictionaryState}
                switchState={switchState}
            />
            <PrimaryButton onClick={createRoomHandler} type='button'>
                Next
            </PrimaryButton>
        </>
    )
}
