import { useCallback, useState } from 'react'

interface UseInput {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const useInput = (initValue: string = ''): UseInput => {
    const [value, setValue] = useState<string>('')

    const onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        },
        []
    )

    return { value, onChange }
}
