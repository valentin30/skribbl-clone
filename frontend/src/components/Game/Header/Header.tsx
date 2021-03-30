import { Card, CardContent } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import styles from './Header.module.scss'
import { Rounds } from './Rounds'
import { Timer } from './Timer'
import { Word } from './Word'

interface Props {}

export const Header: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <Timer />
                <Rounds />
                <Word />
            </CardContent>
        </Card>
    )
}
