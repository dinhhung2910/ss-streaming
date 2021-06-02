/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';

/**
 *
 * @param {*} props
 * @return {*}
 */
function ImageWithRatio(props) {
  const {ratio, width, ...rest} = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(parseInt(width / ratio));
  }, [width]);

  return (
    <img {...rest}
      style={{
        height: height ? height + 'px' : 'auto',
      }}/>
  );
}

export default ImageWithRatio;
