/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import Moment from 'react-moment';
import {useDispatch} from 'react-redux';
import {getParticipantsInCourse} from '../../features/course/courseSlice';
import Loading from '../loading';

/**
 *
 * @param {*} props
 * @return {*}
 */
function ListParticipants(props) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const {courseId} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const loadParticipants = async () => {
      const res = await dispatch(getParticipantsInCourse(courseId));
      setLoading(false);
      setList(res);
    };

    loadParticipants();
  }, [courseId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>

      <h4 className="my-4"> List participants</h4>

      <table className="uk-table uk-table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Join date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((en, index) => (
            <tr key={en._id}>
              <td>{index + 1}</td>
              <td>{en.studentId.fullName}</td>
              <td>{en.studentId.email}</td>
              <td>
                <Moment format="DD/MM/YYYY">
                  {en.createdDate}
                </Moment>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListParticipants;
