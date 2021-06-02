/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useResizeDetector} from 'react-resize-detector';
import {Link} from 'react-router-dom';
import {selectUser} from '../../features/user/userSlice';
import {GOLDEN_RATIO, PublicLinks, reactStarsColor, TeacherLinks, UserRole} from '../../utils/constants';
import ImageWithRatio from '../imageWithRatio';
import ReactStars from 'react-rating-stars-component';

/**
 * @param {*} props
 * @return {*}
 */
function CourseCardMoreBasic(props) {
  const {course, showCountStudent} = props;
  const user = useSelector(selectUser);
  const [isOwner, setIsOwner] = useState(false);
  const {width, ref} = useResizeDetector();
  const style = props.style || {};

  useEffect(() => {
    if (!user) {
      setIsOwner(false);
      return;
    }

    if (user.type == UserRole.ROLE_ADMIN) {
      setIsOwner(true);
    } else if (user.type == UserRole.ROLE_TEACHER) {
      if (user._id == course.teacherId._id) {
        setIsOwner(true);
      }
    }
  }, []);

  return (
    <Fragment>

      <div ref={ref} style={style}>
        <Link to={isOwner ? TeacherLinks.COURSE_DETAIL + '/' + course._id :
          PublicLinks.COURSE_DETAIL + '/' + course._id
        }>
          <div className="course-card episode-card animate-this">
            <div className="course-card-thumbnail ">
              <span className="item-tag">{course.categoryId.name}</span>
              <ImageWithRatio src={course.thumbnail} width={width} ratio={GOLDEN_RATIO} />
              <span className="play-button-trigger"></span>
            </div>
            <div className="course-card-body">
              <h4 className="mb-0"> {course.name} </h4>
            </div>
          </div>
        </Link>
      </div>

    </Fragment>
  );
}

export default CourseCardMoreBasic;
