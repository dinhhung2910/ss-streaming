/* eslint-disable react/prop-types */
import React from 'react';

/**
 *
 * @param {*} props
 * @return {*}
 */
function MutedLink(props) {
  const {onClick, ...rest} = props;

  return (
    <a {...rest} onClick={(e) => {
      e.preventDefault();
      if (typeof onClick === 'function') {
        onClick(e);
      }
    }} />
  );
}

export default MutedLink;
