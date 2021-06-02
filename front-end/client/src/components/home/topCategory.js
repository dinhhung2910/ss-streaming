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
import {PublicLinks} from '../../utils/constants';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 960},
    items: 4,
  },
  desktop: {
    breakpoint: {max: 960, min: 640},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 640, min: 464},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
};

/**
 *
 * @return {*}
 */
function TopCategory() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    const res = await dispatch(getTopCategories());
    setCategories(res);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="section-small">

      <div className="course-grid-slider uk-slider uk-slider-container" uk-slider="finite: true">

        <div className="grid-slider-header">
          <div>
            <h4 className="uk-text-truncate"> popular&ensp;
              <Link to={PublicLinks.LIST_CATEGORIES} className="text-success">Categories</Link>
            </h4>
          </div>
          <div className="grid-slider-header-link">

            <Link to={PublicLinks.LIST_CATEGORIES} className="button transparent uk-visible@m">
              <span className="icon-feather-external-link"></span>{' View all'}
            </Link>

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
                categories.map((en) => (
                  <li tabIndex="-1" className="uk-active" key={en._id}>
                    <CategoryCard category={en} />
                  </li>
                ))
              }
            </Carousel>
          )
      }

    </div>

  );
}

export default TopCategory;
