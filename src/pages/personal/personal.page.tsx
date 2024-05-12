import React from 'react'
import HeaderTurnBackComponent from '../../components/header_turn_back/header_turn_back.component'
import { Fade } from 'react-awesome-reveal';

const PersonalPage: React.FC = () => {
    return (
        <div>
            <Fade direction='down'>
                <HeaderTurnBackComponent title="Sección finanzas personales" />
            </Fade>
        </div>
    )
}

export default PersonalPage
