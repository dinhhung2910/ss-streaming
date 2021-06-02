/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getStudentReview, submitStudentReview} from '../../features/course/courseSlice';
import ReactStars from 'react-rating-stars-component';
import {relativeTimeRounding} from 'moment';
import BlankAvatar from '../../assets/images/blank-profile.png';


/**
 *
 * @param {*} props
 * @return {*}
 */
function SubmitReview(props) {
  const dispatch = useDispatch();
  const courseId = props.courseId;
  const onSubmit = (typeof props.onSubmit === 'function' ? props.onSubmit : () => {});
  const [review, setReview] = useState({
    rating: 5,
    review: '',
  });

  const loadReview = async () => {
    const res = await dispatch(getStudentReview(courseId));
    setReview(res);
  };

  const reactStarsColor = {
    activeColor: '#febe42',
    color: '#ddd',
  };
  useEffect(() => {
    loadReview();
  }, [courseId]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(submitStudentReview(courseId, review));
    if (res) {
      onSubmit();
    }
  };

  return (
    <div className="comments">
      <h3>Submit Review </h3>
      <ul>
        <li>
          <div className="avatar"><img src={BlankAvatar} alt="" />
          </div>
          <div className="comment-content">
            <form className="uk-grid-small uk-grid" uk-grid="" onSubmit={submit}>
              <div className="uk-width-1-1@s uk-first-column">
                <label className="uk-form-label">Rating</label>
                <ReactStars
                  {...reactStarsColor}
                  size={'50px'}
                  value={review.rating}
                  classNames="course-rating" onChange={
                    (e) => {
                      setReview({
                        ...review,
                        rating: e,
                      });
                    }
                  }/>
              </div>
              <div className="uk-width-1-1@s uk-grid-margin uk-first-column">
                <label className="uk-form-label">Comment</label>
                <textarea className="uk-textarea"
                  value={review.review}
                  onChange={(e) => {
                    setReview({
                      ...review,
                      review: e.target.value,
                    });
                  }}
                  placeholder="Enter Your Comments here..."
                  style={{height: '160px'}}></textarea>
              </div>
              <div className="uk-grid-margin uk-first-column">
                <input type="submit" value="submit" className="button grey" />
              </div>
            </form>

          </div>
        </li>
      </ul>
    </div>
  );
}

export default SubmitReview;
