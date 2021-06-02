/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useState} from 'react';
import Carousel from 'react-multi-carousel';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTopCategories} from '../../features/category/categorySlice';
import MutedLink from '../mutedLink';
import Spinning from '../../assets/images/Rolling-1s-42px.svg';
import CategoryCard from '../category/categoryCard';
import {PublicLinks, responsive} from '../../utils/constants';
import {getListPopularCourse} from '../../features/course/courseSlice';
import CourseCardBasic from '../course/courseCardBasic';


/**
 *
 * @return {*}
 */
function PopularCourses() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadList = async () => {
    const res = await dispatch(getListPopularCourse());
    setList(res);
    setLoading(false);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div className="section-small pt-0">

      <div className="course-grid-slider uk-slider uk-slider-container" uk-slider="finite: true">

        <div className="grid-slider-header">
          <div>
            <h4 className="uk-text-truncate"> popular Courses
            </h4>
          </div>
          <div className="grid-slider-header-link">

          </div>
        </div>
      </div>
      {
        loading ? (
          <Carousel responsive={responsive}
            containerClass='uk-slider-items'
            itemClass='carousel-item'
          >
            {
              [{}, {}, {}, {}].map((en, index) => (
                <li tabIndex="-1" className="uk-active" key={index}>
                  <MutedLink to={'/category/' + en._id} className="skill-card playholder">
                    <img src={Spinning} />
                  </MutedLink>
                </li>
              ))
            }
          </Carousel>) :
          (
            <Carousel responsive={responsive}
              containerClass='uk-slider-items'
              itemClass='carousel-item'
            >
              {
                list.map((en) => (
                  <li tabIndex="-1" className="uk-active" key={en._id}>
                    <CourseCardBasic
                      showCountStudent={true}
                      course={en} />
                  </li>
                ))
              }
            </Carousel>
          )
      }

    </div>

  );
}

export default PopularCourses;
