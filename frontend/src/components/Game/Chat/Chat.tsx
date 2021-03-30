import { Card, CardContent } from '@material-ui/core'
import { QuestionAnswer as ChatIcon } from '@material-ui/icons'
import React, { FunctionComponent } from 'react'
import { CardHeader } from '../../UI/CardHeader'
import styles from './Chat.module.scss'

interface Props {}

export const Chat: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <CardHeader>
                    <ChatIcon />
                    Chat
                </CardHeader>
            </CardContent>
        </Card>
    )
}
