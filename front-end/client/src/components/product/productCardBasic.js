/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useState} from 'react';
import {useResizeDetector} from 'react-resize-detector';
import {GOLDEN_RATIO, reactStarsColor} from '../../utils/constants';
import ImageWithRatio from '../imageWithRatio';
import ReactStars from 'react-rating-stars-component';
import MutedLink from '../mutedLink';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserId} from '../../features/user/userSlice';
import {sendEventToServer} from '../../features/event';

/**
 * @param {*} props
 * @return {*}
 */
function ProductCardBasic(props) {
  const dispatch = useDispatch();

  const {product} = props;
  const {width, ref} = useResizeDetector();
  const style = props.style || {};

  const userId = useSelector(selectUserId);
  const [enterTime, setEnterTime] = useState(null);

  const sendEvent = (e) => {
    dispatch(sendEventToServer(e));
  };

  const onMouseEnter = (e) => {
    const timestamp = new Date();
    setEnterTime(timestamp);
    const event = {
      timestamp,
      userId,
      productId: product._id,
      isEnter: true,
      length: -1,
    };
    sendEvent(event);
  };

  const onMouseLeave = (e) => {
    const timestamp = new Date();
    const duration = timestamp - enterTime;

    const event = {
      timestamp,
      userId,
      productId: product._id,
      isEnter: false,
      length: duration,
    };
    sendEvent(event);
  };

  return (
    <Fragment>

      <div ref={ref} style={style}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}>
        <MutedLink to={''}>
          <div className="course-card course-card-basic">
            <div className="course-card-thumbnail ">
              <ImageWithRatio src={product.image} width={width} ratio={GOLDEN_RATIO} />
              <span className="play-button-trigger"></span>
            </div>
            <div className="course-card-body">
              <div className="course-card-info">
                <div>
                  <span className="catagroy">{product.category.name}</span>
                </div>
                <div>
                  <i className="icon-feather-bookmark icon-small"></i>
                </div>
              </div>

              <h4 title={product.name}>
                {product.name}
              </h4>
              <p className="description"> {product.description}</p>

              <div className="course-card-footer">
                <h5>
                  <ReactStars
                    edit={false}
                    {...reactStarsColor}
                    value={5}
                  />
                </h5>
                <h5>
                  <Fragment>
                    <i className="icon-feather-dollar-sign"></i> {product.cost.toFixed(2)}
                  </Fragment>
                </h5>
              </div>
            </div>

          </div>
        </MutedLink>
      </div>

    </Fragment>
  );
}

export default ProductCardBasic;
