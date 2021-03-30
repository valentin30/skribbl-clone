import { useMemo } from 'react'
import { useLocation } from 'react-router'

interface GetRoomID {
    roomID: string
}

export const useGetRoomIDFromURL = (): GetRoomID => {
    const { search } = useLocation()

    const roomID = useMemo(() => {
        const params: URLSearchParams = new URLSearchParams(search)

        const roomID: string = params.get('id') ?? ''

        return roomID
    }, [search])

    return { roomID }
}
