/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRandomCourse} from '../../features/course/courseSlice';
import {popClasses, pushClasses} from '../../features/navbar/navbarSlice';
import {Link} from 'react-router-dom';
import {PublicLinks, TeacherLinks} from '../../utils/constants';
import {selectUser} from '../../features/user/userSlice';
/**
 *
 * @param {*} props
 * @return {*}
 */
function Banner(props) {
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const user = useSelector(selectUser);
  const loadRandomCourse = async () => {
    const res = await dispatch(getRandomCourse());
    setCourse(res);
  };

  useEffect(() => {
    loadRandomCourse();

    dispatch(pushClasses('home'));

    return () => dispatch(popClasses('home'));
  }, []);

  if (!course) {
    return null;
  }


  return (
    <div className="home-hero" data-src="../assets/images/home-hero.png" uk-img=""
      style={{background: 'white'}}>
      <img className="home-banner-image" src={course.thumbnail} />
      <div className="uk-width-1-1 home-banner-text">
        <div className="page-content-inner uk-position-z-index">
          <h1>{course.name}</h1>
          <h4 className="my-lg-4"> {course.description} </h4>
          <Link to={
            ((user && course.teacherId == user._id) ? TeacherLinks.COURSE_DETAIL : PublicLinks.COURSE_DETAIL) +
            '/' + course._id} className="button grey">Start </Link>
          <div className="blur" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
