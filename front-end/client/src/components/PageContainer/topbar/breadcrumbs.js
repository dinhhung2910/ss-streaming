import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectBreadcrumbs} from '../../../features/navbar/navbarSlice';

/**
 *
 * @return {Component}
 */
function Breadcrumbs() {
  const breadcrumbs = useSelector(selectBreadcrumbs);

  return (
    <nav id="breadcrumbs">
      <ul>
        {breadcrumbs.map((en, index) => {
          return (
            <li key={index}>
              {index != breadcrumbs.length - 1 ?
                (<Link to={en.link}>{en.name}</Link>) : en.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
