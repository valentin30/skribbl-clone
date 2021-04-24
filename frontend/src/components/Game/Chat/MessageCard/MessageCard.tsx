import { Typography } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { Message } from '../../../../types/Chat/Message'
import { Avatar } from '../../../UI/Avatar'
import styles from './MessageCard.module.scss'

interface Props {
    message: Message
}

export const MessageCard: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
> = forwardRef((props, ref) => {
    const { message } = props

    return (
        <div ref={ref} className={styles.root}>
            <Avatar color={message.user.color} name={message.user.name} small />
            <div>
                <div>
                    <Typography variant='body1'>{message.user.name}</Typography>
                    <Typography variant='caption' color='textSecondary'>
                        {message.date}
                    </Typography>
                </div>
                <Typography
                    color={message.guessed ? 'primary' : 'textPrimary'}
                    variant={message.guessed ? 'subtitle2' : 'body2'}>
                    {message.content}
                </Typography>
            </div>
        </div>
    )
})
