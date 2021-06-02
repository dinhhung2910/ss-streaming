import React from 'react';
import Rolling from '../assets/images/Rolling-1s-42px.svg';
/**
 *
 * @return {*}
 */
function Loading() {
  return (
    <div className="loading-full-page">
      <img src={Rolling}/>
    </div>
  );
}

export default Loading;
