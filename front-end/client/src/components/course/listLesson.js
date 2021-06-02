/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import Moment from 'react-moment';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  getLessonByCourse,
  selectLessonCourseId,
  selectLessonLoading,
  selectListLesson,
  setCourseId,
  setLoading,
} from '../../features/lesson/lessonSlice';
import {checkBuyCourse} from '../../features/course/courseSlice';

import {StudentLinks, TeacherLinks} from '../../utils/constants';
import MutedLink from '../mutedLink';
import Loading from '../loading';

/**
 *
 * @param {*} props
 * @return {*}
 */
function ListLesson(props) {
  const {courseId, isOwner} = props;
  const savedCourseId = useSelector(selectLessonCourseId);
  const dispatch = useDispatch();
  const listLesson = useSelector(selectListLesson);
  const loading = useSelector(selectLessonLoading);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    if (courseId && courseId != savedCourseId) {
      dispatch(setLoading(true));
      dispatch(setCourseId(courseId));
    }
  }, [courseId]);

  useEffect(() => {
    dispatch(getLessonByCourse(courseId, isOwner));
  }, [courseId, isOwner]);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      const res = await dispatch(checkBuyCourse(courseId));
      setIsPurchased(res);
    };

    checkPurchaseStatus();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <ul className="course-curriculum uk-accordion" uk-accordion="multiple: true">
        <li className="uk-open">
          <div className="uk-accordion-title"> All lessons
          </div>
          <div className="uk-accordion-content" aria-hidden="false">
            {
              listLesson.length == 0 ? (
                <div className="my-4 uk-text-center">
                  <p className="my-2">
                    <span className="icon-line-awesome-th-list"></span>
                    {' Empty'}
                  </p>
                </div>
              ) : (
                <ul className="course-curriculum-list">
                  {listLesson.map((en) => {
                    let className = '';
                    if (en.meetingEnded) {
                      className = 'completed';
                    } else if (en.meetingStarted) {
                      className = 'calling ';
                    } else {
                      className = 'comming';
                    }
                    return (
                      <li key={en._id} className={className}>
                        {isOwner ? (
                          <Link to={TeacherLinks.LESSON_DETAIL + '/' + en._id}>
                            {en.name}
                          </Link>
                        ) : (isPurchased ? (
                          <Link to={StudentLinks.LESSON_DETAIL + '/' + en._id}>
                            {en.name}
                          </Link>
                        ) : (
                          <span>
                            {en.name}
                          </span>
                        ))}

                        {
                          isOwner ? (
                            <Link to={TeacherLinks.EDIT_LESSON + '/' + en._id} className="button gray">
                            Edit
                            </Link>
                          ) : null
                        }

                        {en.isHide ?
                          (
                            <MutedLink href="" uk-toggle className="badge">
                              <i className="icon-feather-eye-off"></i>
                              {' Hiding'}
                            </MutedLink>
                          ) : null}
                        <span>
                          <Moment format="DD/MM/YYYY">{en.startDate}</Moment>
                        </span>

                      </li>
                    );
                  })

                  }
                </ul>
              )
            }
          </div>
        </li>
      </ul>

    </Fragment>
  );
}

export default ListLesson;
