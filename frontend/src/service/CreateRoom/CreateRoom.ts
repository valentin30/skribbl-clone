import { CreateRoomDto } from '../../types/dto/CreateRoomDto'
import { RoomIdResponseDto } from '../../types/dto/RoomIdResponseDto'

const CREATE_ROOM: string = `${process.env.REACT_APP_API_URL}/room/create`

export const createRoom = async (
    createRoomDto: CreateRoomDto
): Promise<RoomIdResponseDto> => {
    const response: Response = await fetch(CREATE_ROOM, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createRoomDto)
    })

    if (!response.ok) {
        throw new Error('Somting went wrong!')
    }

    return response.json()
}
