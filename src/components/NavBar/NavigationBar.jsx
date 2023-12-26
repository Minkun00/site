import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import Login from './Login/Login';
import { useSiteContext } from '../context';
import discordIcon from '../../Icons/discord.png';
import githubIcon from '../../Icons/github-mark.png';

export default function NavigationBar() {
  const { globalState } = useSiteContext();
  const isOwner = globalState === process.env.REACT_APP_OWNER_ADDRESS;
  const isLoggedIn = globalState != 'initial value';

  return (
    <nav>
      <ul>
        <li>
          <Link to="/site">
            <button>
              Home
            </button>
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/posting">
              <button>
                Posting
              </button>
            </Link>
          </li>
        )}
        <li>
          <Login/>
        </li>
        {isOwner && (
          <li>
            <Link to="/owner">
              <button>
                Owner
              </button>
            </Link>
          </li>
        )}
        <li>
          <Link to='https://discord.com/users/825886412142411856' target='_blank'>
            <img className='icon-button-nav' src={discordIcon} alt='Discord Icon' />
          </Link>
        </li>
        <li>
          <Link to='https://github.com/Minkun00' target='_blank'>
            <img className='icon-button-nav' src={githubIcon} alt='Github Icon' />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
