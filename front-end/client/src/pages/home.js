/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/loading';
import {popBreadcrumb, pushBreadcrumb} from '../features/navbar/navbarSlice';
import {Button} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import AddProduct from '../components/product/addProduct';
import {setAlert} from '../features/notification/notificationSlice';
import {selectProductList, selectProductLoading} from '../features/products/productSlice';
import ProductCardBasic from '../components/product/productCardBasic';

/**
 *
 * @param {*} props
 * @return {*}
 */
function Home(props) {
  const dispatch = useDispatch();

  const list = useSelector(selectProductList);
  const loading = useSelector(selectProductLoading);

  const [showModal, setShowModal] = useState(false);
  const [submitTime, setSubmitTime] = useState(0);


  useEffect(() => {
    dispatch(pushBreadcrumb({
      link: 1,
      name: 'List products',
    }));

    return () => dispatch(popBreadcrumb(1));
  }, []);

  if (loading) {
    return (<Loading />);
  }

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    setSubmitTime(submitTime + 1);
  };

  return (
    <Fragment>
      <Helmet>
        <title>List products</title>
      </Helmet>

      {/* Modal to add product */}
      <Modal
        visible={showModal}
        width={1000}
        title="Add product"
        onCancel={handleCancel}
        onOk={handleSubmit}
        footer={
          [(<Button key="submit"
            className="button grey"
            onClick={handleSubmit}>
                Create
          </Button>)
          ,
          (<Button key="back"
            className="button light"
            onClick={handleCancel}>
                Return
          </Button>),
          ]
        }
      >
        <AddProduct
          onClose={() => {
            handleCancel();
          }}
          submit={submitTime}
        />
      </Modal>
      {/* End modal to add product */}
      <div className="container">
        <h1>List products</h1>
        <div className="section-header pb-0 mt-5">
          <div className="section-header-left">
            <h4> Found {list.length} {list.length <= 1 ? 'result' : 'results'}.
            </h4>
          </div>
          <div className="section-header-right">
            <button className="button grey" onClick={() => setShowModal(true)}>
              Add product
            </button>
          </div>

        </div>

        <div className="section-small">

          <div className="uk-child-width-1-4@m uk-child-width-1-3@s course-card-grid uk-grid-match uk-grid" uk-grid="">
            {list.map((en) => (
              <ProductCardBasic product={en} key={en._id} style={{paddingBottom: '20px'}}/>
            ))}
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default Home;
