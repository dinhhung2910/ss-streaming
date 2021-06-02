/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {checkBuyCourse, getCourseComments} from '../../features/course/courseSlice';
import SubmitReview from './submitReview';
import ReactStars from 'react-rating-stars-component';
import BlankAvatar from '../../assets/images/blank-profile.png';


/**
 *
 * @param {*} props
 * @return {*}
 */
function CourseReview(props) {
  const course = props.course;
  const courseId = course._id;
  const [isPurchased, setIsPurchased] = useState(false);
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  const reactStarsColor = {
    activeColor: '#febe42',
    color: '#ddd',
  };

  const getListComments = async () => {
    const res = await dispatch(getCourseComments(courseId));
    setComments(res);
  };

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      const res = await dispatch(checkBuyCourse(courseId));
      setIsPurchased(res);
    };
    getListComments();

    checkPurchaseStatus();
  }, [courseId]);

  return (
    <Fragment>

      <div className="review-summary">
        <h4 className="review-summary-title"> Student feedback </h4>
        <div className="review-summary-container">
          <div className="review-summary-avg">
            <div className="avg-number">
              {(course.averageRating || 5).toFixed(1)}
            </div>
            <div className="review-star">
              <ReactStars
                edit={false}
                {...reactStarsColor}
                value={course.averageRating}
              />
            </div>
            <span>Course Rating</span>
          </div>

          <RatingDetail list={course.rating || []} />

        </div>
      </div>

      <div className="comments">
        <h4>Reviews <span className="comments-amount"> ({comments.length}) </span> </h4>

        <ul>

          {comments.map((en) => (
            <li key={en._id}>
              <div className="avatar"><img src={BlankAvatar} alt="" />
              </div>
              <div className="comment-content">
                <div className="comment-by">{en.studentId.fullName}<span>Student</span>
                  <div className="comment-stars">
                    <ReactStars
                      edit={false}
                      {...reactStarsColor}
                      value={en.rating}
                    />
                  </div>
                </div>
                <p>{en.review}</p>

              </div>

            </li>
          ))}


        </ul>

      </div>

      {
        isPurchased ? (
          <SubmitReview courseId={courseId} onSubmit={() => getListComments()}/>
        ) : null
      }


    </Fragment>
  );
}

const RatingDetail = (props) => {
  const list = props.list;
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i];
  }

  const reactStarsColor = {
    activeColor: '#febe42',
    color: '#ddd',
  };

  return (
    <div className="review-summary-rating">
      {
        list.filter((en, index) => index >= 1 && index <= 5).map((en, index) => {
          return (
            <div className="review-summary-rating-wrap" key={en}>
              <div className="review-bars">
                <div className="full_bar">
                  <div className="bar_filler" style={{width: (en / total * 100).toFixed(0) + '%'}}></div>
                </div>
              </div>
              <div className="review-stars">
                <ReactStars
                  edit={false}
                  {...reactStarsColor}
                  value={index + 1}
                />
              </div>
              <div className="review-avgs">
                {(en / total * 100).toFixed(0) + '%'}
              </div>
            </div>
          );
        })
      }

    </div>
  );
};

export default CourseReview;
