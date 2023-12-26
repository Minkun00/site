import React from 'react';
import { Link } from 'react-router-dom';
import discordIcon from '../../Icons/discord.png';
import githubIcon from '../../Icons/github-mark.png';
import './Welcome.css';

export default function WelcomePage() {
    return (
        <div className='welcome-container'>
            <Link to='https://discord.com/users/825886412142411856' target='_blank'>
                <img className='icon-button' src={discordIcon} alt='Discord Icon' />
            </Link>
            <Link to='https://github.com/Minkun00' target='_blank'>
                <img className='icon-button' src={githubIcon} alt='Github Icon' />
            </Link>
        </div>
    )
}