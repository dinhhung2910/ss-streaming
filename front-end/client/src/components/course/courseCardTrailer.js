/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useResizeDetector} from 'react-resize-detector';
import {GOLDEN_RATIO, StudentLinks, TeacherLinks, UserRole} from '../../utils/constants';
import ImageWithRatio from '../imageWithRatio';
import {selectUser} from '../../features/user/userSlice';
import {Link, useHistory} from 'react-router-dom';
import MutedLink from '../mutedLink';
import {checkBuyCourse, purchaseCourse} from '../../features/course/courseSlice';
import {getNextLesson} from '../../features/lesson/lessonSlice';

/**
 *
 * @return {Component}
 */
function CourseCardTrailer(props) {
  const {course} = props;
  const {width, ref} = useResizeDetector();
  const {isOwner} = props;
  const [isPurchased, setIsPurchased] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();

  let actionButtons = null;

  const purchaseFunc = async () => {
    const res = await dispatch(purchaseCourse(course._id));
    setIsPurchased(res);
  };

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      const res = await dispatch(checkBuyCourse(course._id));
      setIsPurchased(res);
    };

    if (user && user.type == UserRole.ROLE_STUDENT) {
      checkPurchaseStatus();
    }
  }, []);

  if (!user) {
    actionButtons = (
      <Fragment>
        <div className="uk-first-column">
          <Link to="/login" className="uk-width-1-1 button grey transition-3d-hover"> <i className="uil-play"></i> Start </Link>
        </div>
      </Fragment>
    );
  } else if (isOwner) {
    actionButtons = (
      <Fragment>
        <div className="uk-first-column">
          <Link to={TeacherLinks.EDIT_COURSE + '/' + course._id}
            className="uk-width-1-1 button grey transition-3d-hover">
            <i className="uil-edit"></i> Update
          </Link>
        </div>
      </Fragment>
    );
  } else if (user.type == UserRole.ROLE_STUDENT) {
    if (isPurchased) {
      actionButtons = (
        <Fragment>
          <div className="uk-first-column">
            <MutedLink to="/login"
              onClick={async () => {
                const res = await dispatch(getNextLesson(course._id));
                if (res) {
                  history.push(StudentLinks.LESSON_DETAIL + '/' + res._id);
                }
              }}
              className="uk-width-1-1 button grey transition-3d-hover">
              <i className="uil-play"></i> Start
            </MutedLink>
          </div>
        </Fragment>
      );
    } else {
      actionButtons = (
        <Fragment>
          <div className="uk-first-column">
            <MutedLink href="/"
              onClick={purchaseFunc}
              className="uk-width-1-1 button grey transition-3d-hover">
              <i className="icon-feather-shopping-cart"></i>{' Purchase'}
            </MutedLink>
          </div>
        </Fragment>
      );
    }
  }
  return (
    <Fragment>
      <div className="course-card-trailer uk-sticky"
        ref={ref}>
        <div className="course-thumbnail">
          <ImageWithRatio
            width={width}
            src={course.thumbnail} ratio={GOLDEN_RATIO} />
          {/* <a className="play-button-trigger show" href="https://foxthemes.net/demo/courseplus/default/course-intro.html#trailer-modal" uk-toggle=""> </a> */}
        </div>


        <div className="p-3">

          <p className="my-3 text-center">
            <span className="uk-h1"> ${course.price.toFixed(2)} </span>
            <s className="uk-h4 text-muted"> ${course.price.toFixed(2)} </s>
            {/* <s className="uk-h6 ml-1 text-muted"> $32.99 </s> */}
          </p>

          <div className="uk-child-width-1-2 uk-grid-small mb-4 uk-grid" uk-grid="">
            {actionButtons}
          </div>

          <p className="uk-text-bold"> This Course Incluce </p>

          <div className="uk-child-width-1-2 uk-grid-small uk-grid" uk-grid="">
            <div className="uk-grid-margin uk-first-column">
              <span> <i className="uil-file-alt"></i>
                {' '} {course.lessonCount} {course.lessonCount <= 1 ? ' lesson' : ' lessons'}
              </span>
            </div>
            <div className="uk-grid-margin">
              <span> <i className="uil-video"></i> Watch Offline </span>
            </div>
            <div className="uk-grid-margin uk-first-column">
              <span> <i className="uil-clock-five"></i> Lifetime access </span>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-sticky-placeholder" style={{height: '561px', margin: '-300px 0px 0px', hidden: ''}}>

      </div>
    </Fragment>
  );
}


export default CourseCardTrailer;

// <div id="trailer-modal" uk-modal="" className="uk-modal" style={{opacity: '1', overflow: 'visible'}}>
// <div className="uk-modal-dialog" id="_no-clickjacking-0" style={{opacity: '1', overflow: 'visible'}}>
//   <button className="uk-modal-close-default mt-2 mr-1 uk-icon uk-close" type="button" uk-close="">
//     <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" strokeWidth="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" strokeWidth="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button>
//   <div className="uk-modal-header">
//     <h4> Trailer video </h4>
//   </div>
//   <div className="video-responsive">
//     <iframe src="./course-intro_files/nOCXXHGMezU.html" className="uk-padding-remove uk-responsive-width" uk-video="automute: true" frameBorder="0" allowFullScreen="" uk-responsive=""></iframe>
//   </div>

//   <div className="uk-modal-body">
//     <h3>Build Responsive Websites </h3>
//     <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
//                 dolore
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident,
//                 sunt
//                 in culpa qui officia deserunt mollit anim id est laborum.</p>
//   </div>
// </div>
// </div>
