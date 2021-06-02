/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import Moment from 'react-moment';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectUser} from '../../features/user/userSlice';
import {PublicLinks, TeacherLinks, UserRole} from '../../utils/constants';
import CourseCardTrailer from './courseCardTrailer';
import CourseReview from './courseReview';
import ListLesson from './listLesson';
import ListParticipants from './listParticipants';

/**
 *
 * @param {*} props
 * @return {*}
 */
function CourseDetail(props) {
  const {course} = props;
  const courseId = course._id;
  const [activeTab, setActiveTab] = useState('overview');
  const user = useSelector(selectUser);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!user) setIsOwner(false);
    else {
      if (user.type == UserRole.ROLE_ADMIN) setIsOwner(true);
      else if (user.type == UserRole.ROLE_TEACHER && user._id == course.teacherId._id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [user]);

  // select tab
  const onSelectTab = (e, val) => {
    e.preventDefault();
    setActiveTab(val);
  };

  return (
    <Fragment>
      <div className="course-details-wrapper topic-1 uk-light">
        <div className="container p-sm-0">

          <div uk-grid="" className="uk-grid uk-grid-stack">
            <div className="uk-width-2-3@m uk-first-column">

              <div className="course-details">
                <h1> {course.name}</h1>
                <p> {course.description} </p>

                <button className="button  soft-warning">{course.categoryId.name}</button>

                <div className="course-details-info mt-4">
                  <ul>
                    {/* <li>
                        <div className="star-rating"><span className="avg"> 4.9 </span> <span className="star"></span><span className="star"></span><span className="star"></span><span className="star"></span><span className="star"></span>
                        </div>
                      </li> */}
                    <li> <i className="icon-feather-users"></i> {course.totalParticipants} Enerolled </li>
                  </ul>
                </div>

                <div className="course-details-info">
                  <ul>
                    <li> Created by
                      <Link to={isOwner ? TeacherLinks.MY_COURSE : (PublicLinks.ALL_COURSE_BY_TEACHER + '/' + course.teacherId._id)}>
                      &ensp;{course.teacherId.fullName}
                      </Link>
                    </li>
                    <li>
                      {'From '}
                      <Moment format={'DD/MM/YYYY'}>
                        {course.startDate}
                      </Moment>
                      {' to '}
                      <Moment format={'DD/MMYYYY'}>
                        {course.endDate}
                      </Moment>
                    </li>
                  </ul>
                </div>
              </div>
              <nav className="responsive-tab style-5">
                <ul uk-switcher="connect: #course-intro-tab ;animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium">
                  <li className={activeTab == 'overview' ? 'uk-active' : ''}>
                    <a href="#" aria-expanded="true" onClick={(e) => onSelectTab(e, 'overview')}>Overview</a>
                  </li>
                  <li className={activeTab == 'lessons' ? 'uk-active' : ''}>
                    <a href="#" aria-expanded="true" onClick={(e) => onSelectTab(e, 'lessons')}>
                          Lessons
                    </a>
                  </li>
                  {isOwner ? (
                    <li className={activeTab == 'participants' ? 'uk-active' : ''}>
                      <a href="#" aria-expanded="true" onClick={(e) => onSelectTab(e, 'participants')}>
                          Participants
                      </a>
                    </li>) : null}
                  <li className={activeTab == 'review' ? 'uk-active' : ''}>
                    <a href="#" aria-expanded="true" onClick={(e) => onSelectTab(e, 'review')}>
                          Reviews
                    </a>
                  </li>
                </ul>
              </nav>

            </div>
          </div>

        </div>
      </div>
      <div className="container">

        <div className="uk-grid-large mt-4 uk-grid" uk-grid="">
          <div className="uk-width-2-3@m uk-first-column">
            <ul id="course-intro-tab" className="uk-switcher mt-4" style={{touchAction: 'pan-y pinch-zoom'}}>
              <li className={'course-description-content ' + (activeTab == 'overview' ? 'uk-active' : '')}
                dangerouslySetInnerHTML={{__html: course.overview}}>
              </li>

              <li className={activeTab == 'lessons' ? 'uk-active' : ''}>
                {isOwner ? (
                  <div className="section-header">
                    <div className="section-header-right">
                      <Link to={TeacherLinks.ADD_LESSON + '/' + courseId} className="button grey">
                          Add lesson
                      </Link>
                    </div>
                  </div>
                ) : null}

                <ListLesson courseId={courseId} isOwner={isOwner}/>
              </li>

              {isOwner ? (
                <li className={activeTab == 'participants' ? 'uk-active' : ''}>
                  <ListParticipants courseId={course._id} />
                </li>
              ) : null}

              <li className={activeTab == 'review' ? 'uk-active' : ''}>
                <CourseReview course={course} />
              </li>
            </ul>
          </div>

          <div className="uk-width-1-3@m">
            <CourseCardTrailer course={course} isOwner={isOwner} />
          </div>

        </div>
      </div>

    </Fragment>
  );
}

export default CourseDetail;
