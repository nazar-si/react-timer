import React from 'react'
import style from "./divider.module.css"
import { classNames } from '../../../utls/classnames'
import length from '../../../utls/length'

type Props = {
    children?: React.ReactNode,
    align?: "center"| "left" | "right",
    gap?: number | string,
    variant?: "gradient"|"default"; 
    hoverable?: boolean  
}

export default function Divider({children, gap = 2, align, ...props}: Props) {
  return (
    <div className={classNames(style.divider, props.hoverable && style.hoverable)} style={{
        gap:children?length(gap):0,
    }}>
        {align !== "left" && <div className={classNames(style.line, props.variant=="gradient" && style.gradient)}/>}
        <div className={style.content}>
            {children}
        </div>
        {align !== "right" && <div className={classNames(style.line, props.variant=="gradient" && style.gradient)}/>}
    </div>
  )
}