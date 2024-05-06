import moment from 'moment'
import React, { useEffect, useState } from 'react'

const DateDisplay: React.FC = () => {
    const [date, setDate] = useState('')

    const setFormatDate = () => setDate(moment().toDate().toString())

    useEffect(() => {
        if (date === '') setFormatDate();

        const interval = setInterval(() => setFormatDate(), 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ color: 'orange' }}>{date}</span>
        </div>
    )
}

export default DateDisplay
