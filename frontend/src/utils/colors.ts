export const colors: string[] = [
    '#00AA55',
    '#009FD4',
    '#B381B3',
    '#939393',
    '#E3BC00',
    '#D47500',
    '#DC2A2A'
]

export const getRandomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)]
}

export const generateRandomColor = (): string => {
    const red: number = Math.floor(Math.random() * 360)
    const green: number = Math.floor(Math.random() * 360)
    const blue: number = Math.floor(Math.random() * 360)

    return `rgb(${red},${green},${blue})`
}
