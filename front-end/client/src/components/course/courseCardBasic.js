/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import {useResizeDetector} from 'react-resize-detector';
import {Link} from 'react-router-dom';
import {GOLDEN_RATIO, PublicLinks, reactStarsColor, TeacherLinks, UserRole} from '../../utils/constants';
import ImageWithRatio from '../imageWithRatio';
import ReactStars from 'react-rating-stars-component';

/**
 * @param {*} props
 * @return {*}
 */
function CourseCardBasic(props) {
  const {course, showCountStudent} = props;
  const user = null;
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
          <div className="course-card course-card-basic">
            <div className="course-card-thumbnail ">
              <ImageWithRatio src={course.thumbnail} width={width} ratio={GOLDEN_RATIO} />
              <span className="play-button-trigger"></span>
            </div>
            <div className="course-card-body">
              <div className="course-card-info">
                <div>
                  <span className="catagroy">{course.categoryId.name}</span>
                </div>
                <div>
                  <i className="icon-feather-bookmark icon-small"></i>
                </div>
              </div>

              <h4 title={course.name}>
                {course.name}
              </h4>
              <p className="description"> {course.description}</p>

              <div className="course-card-footer">
                <h5>
                  <ReactStars
                    edit={false}
                    {...reactStarsColor}
                    value={course.averageRating}
                  />
                </h5>
                <h5>
                  {showCountStudent ? (
                    <Fragment>
                      <i className="icon-feather-user"></i> {course.totalParticipants}
                      &ensp;{course.totalParticipants <= 1 ? 'student' : 'students'}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <i className="icon-feather-dollar-sign"></i> {course.price.toFixed(2)}
                    </Fragment>
                  )
                  }
                </h5>
              </div>
            </div>

          </div>
        </Link>
      </div>

    </Fragment>
  );
}

export default CourseCardBasic;
