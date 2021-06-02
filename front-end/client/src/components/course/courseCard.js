/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {GOLDEN_RATIO, PublicLinks, TeacherLinks} from '../../utils/constants';
import {Link} from 'react-router-dom';
import {useResizeDetector} from 'react-resize-detector';
import Moment from 'react-moment';

/**
 * @param {*} props
 * @return {Component} Teacher course card
 */
function TeacherCourseCard(props) {
  const {course} = props;
  const {width, ref} = useResizeDetector();
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    setImageHeight(width * 0.67);
  }, [width]);

  return (


    <Link to={TeacherLinks.COURSE_DETAIL + '/' + course._id} className="blog-post">
      <div ref={ref} className="blog-post-thumbnail" style={
        {minHeight: imageHeight ? imageHeight + 'px' : 'auto'}
      }>
        <div className="blog-post-thumbnail-inner">
          <img src={course.thumbnail} alt="" style={
            {minHeight: imageHeight ? imageHeight + 'px' : 'auto'}
          }/>
        </div>
      </div>
      <div className="blog-post-content">
        <div className="blog-post-content-info">
          <span className="blog-post-info-tag button soft-primary"> {course.categoryId.name} </span>
          <span className="blog-post-info-date">
            <Moment format={'MMM DD YYYY'}>
              {course.startDate}
            </Moment>
            {' - '}
            <Moment format={'MMM DD YYYY'}>
              {course.endDate}
            </Moment>
          </span>
        </div>
        <h3>{course.name}</h3>
        <p dangerouslySetInnerHTML={{__html: course.description}}></p>
        <div>
          <Link to={TeacherLinks.EDIT_COURSE + '/' + course._id} className="button grey" >
            Edit
          </Link>
        </div>
      </div>
    </Link>

  );
}

export const StudentCourseCard = (props) => {
  const {course} = props;
  const {width, ref} = useResizeDetector();
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    setImageHeight(width * 0.67);
  }, [width]);

  return (


    <Link to={PublicLinks.COURSE_DETAIL + '/' + course._id} className="blog-post">
      <div ref={ref} className="blog-post-thumbnail" style={
        {minHeight: imageHeight ? imageHeight + 'px' : 'auto'}
      }>
        <div className="blog-post-thumbnail-inner">
          <img src={course.thumbnail} alt="" style={
            {minHeight: imageHeight ? imageHeight + 'px' : 'auto'}
          }/>
        </div>
      </div>
      <div className="blog-post-content">
        <div className="blog-post-content-info">
          <span className="blog-post-info-tag button soft-primary"> {course.categoryId.name} </span>
          <span className="blog-post-info-date">
            <Moment format={'MMM DD YYYY'}>
              {course.startDate}
            </Moment>
            {' - '}
            <Moment format={'MMM DD YYYY'}>
              {course.endDate}
            </Moment>
          </span>
        </div>
        <h3>{course.name}</h3>
        <p dangerouslySetInnerHTML={{__html: course.description}}></p>
        <div>
          <Link to={PublicLinks.COURSE_DETAIL + '/' + course._id} className="button grey" >
            Start
          </Link>
        </div>
      </div>
    </Link>

  );
};

TeacherCourseCard.PropTypes = {
  props: PropTypes.object.isRequired,
};

export default TeacherCourseCard;
