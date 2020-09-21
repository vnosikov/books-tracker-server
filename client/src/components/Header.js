import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const authData = useSelector((state) => state.auth.data, shallowEqual);
  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to="/"
          className="left brand-logo"
        >
          Books Tracker
        </Link>
        <ul className="right">
          {authData === false && (
            <li><a href="/auth/google">Login With Google</a></li>
          )}
          {authData && (
            <li><a href="/api/logout">Logout</a></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
