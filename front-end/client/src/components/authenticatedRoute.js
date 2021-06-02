/* eslint-disable valid-jsdoc */
import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router';
import {selectUser} from '../features/user/userSlice';
import PropTypes from 'prop-types';
import Maintenance from './maintenance';

/**
 *
 * @return {Component}
 * @param props {*}
 */
function AuthenticatedRoute(props) {
  const user = useSelector(selectUser);
  const roles = props.roles;

  if (!user) {
    return (<Redirect to='/login' />);
  }

  if (user.isBlock) {
    return null;
  }

  if (!user.isActive) {
    return (<Redirect to='/verify' />);
  }

  if (!roles || roles.includes(user.type)) {
    return (
      <Route {...props} />
    );
  }

  return <Maintenance />;
}

AuthenticatedRoute.propTypes = {
  roles: PropTypes.object.isRequired,
};

export default AuthenticatedRoute;
