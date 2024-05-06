import React from 'react'
import DateDisplay from '../components/DateDisplay'
import ContadorDisplay from '../components/ContadorDisplay'

const HomePage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Hello world!</h1>
            <DateDisplay />

            <ContadorDisplay />
            <ContadorDisplay />
            <ContadorDisplay />
            <ContadorDisplay />
        </div>
    )
}

export default HomePage
