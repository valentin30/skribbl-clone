import { Card, CardContent, Typography } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { ChildrenProps } from '../../../types/props/ChildrenProps'
import styles from './CardHeader.module.scss'

interface Props {
    children: React.ReactNode
}

export const CardHeader: FunctionComponent<Props> = props => {
    return (
        <Card className={styles.root} variant='outlined'>
            <CardContent>
                <Typography variant='button' color='textSecondary'>
                    {props.children}
                </Typography>
            </CardContent>
        </Card>
    )
}
