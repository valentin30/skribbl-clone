import { RoomIdResponseDto } from '../../types/dto/RoomIdResponseDto'

const GET_ROOM_ID: string = `${process.env.REACT_APP_API_URL}/room`

export const getRoomId = async (): Promise<RoomIdResponseDto> => {
    const response: Response = await fetch(GET_ROOM_ID)

    if (!response.ok) {
        throw new Error('Somting went wrong!')
    }

    return response.json()
}
