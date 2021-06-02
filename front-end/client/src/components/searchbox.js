/* eslint-disable max-len */
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {selectSearchbox, toggleSearchbox} from '../features/navbar/navbarSlice';
import {PublicLinks} from '../utils/constants';
import isNullOrWhitespace from '../utils/isNullOrWhiteSpaces';

/**
 *
 * @return {Component} Search box
 */
function SearchBox() {
  const showSearchbox = useSelector(selectSearchbox);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const history = useHistory();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key == 'Enter' && !isNullOrWhitespace(query)) {
      dispatch(toggleSearchbox(false));
      history.push(PublicLinks.SEARCH + '?query=' + query);
    }
  };

  return (
    <div id="searchbox" className={showSearchbox ? 'is-active' : ''}>
      <div className="search-overlay"></div>
      <div className="search-input-wrapper">
        <div className="search-input-container">
          <div className="search-input-control">
            <span
              onClick={() => dispatch(toggleSearchbox(false))}
              className="icon-feather-x btn-close uk-animation-scale-up"
            >
            </span>
            <div className=" uk-animation-slide-bottom">
              <input type="text"
                onKeyDown={onKeyDown}
                onChange={onChange}
                name="query" autoFocus="" required=""/>
              <p className="search-help">Type the name of the Course you are looking for</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
