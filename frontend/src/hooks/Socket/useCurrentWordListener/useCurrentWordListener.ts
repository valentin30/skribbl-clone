import { useEffect } from 'react'
import { socket } from '../../../Socket/Socket'
import { CurrentWordData } from '../../../types/dto/data/CurrentWordData'
import { CURRENT_WORD } from '../../../utils/events'
import { useRoom } from '../../Room/useRoom'

export const useCurrentWordListener = (): void => {
    const {
        methods: { setWord }
    } = useRoom()

    useEffect(() => {
        socket.on(CURRENT_WORD, ({ word }: CurrentWordData) => {
            setWord(word)
        })

        return () => {
            socket.off(CURRENT_WORD)
        }
    }, [setWord])
}
