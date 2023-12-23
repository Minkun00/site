import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';
import Login from './Login/Login';
import { useSiteContext } from '../context';

export default function NavigationBar() {
  const { globalState } = useSiteContext();
  const isOwner = globalState === process.env.REACT_APP_OWNER_ADDRESS;
  const isLoggedIn = globalState != 'initial value';

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <button>
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/posting">
            <button>
              Posting
            </button>
          </Link>
        </li>
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
      </ul>
    </nav>
  );
}
