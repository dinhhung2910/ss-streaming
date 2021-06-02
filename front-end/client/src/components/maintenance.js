import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import MaintenanceImage from '../assets/images/maintenance.svg';
import {Helmet} from 'react-helmet';

/**
 *
 * @return {Component} maintenance
 */
function Maintenance() {
  return (
    <Fragment>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div uk-height-viewport="expand: true"
        className="uk-flex uk-flex-middle"
        data-height-expand="" style={{minHeight: '657.727px'}}>
        <div className="uk-width-1-2@m uk-width-1-2@s m-auto text-center">

          <img src={MaintenanceImage} alt="" className="my-3" />

          <h3>Something wrong happened</h3>
          <p className="mb-0">
            We apologize for the inconvenience but this page is
            <br /> currently unavailable.
          </p>
          <Link to="/home"
            className="button grey transition-3d-hover my-4 small" uk-toggle="">
            <i className="icon-feather-clock mr-2"></i> Return to home
          </Link>

        </div>
      </div>
    </Fragment>

  );
}

export default Maintenance;
