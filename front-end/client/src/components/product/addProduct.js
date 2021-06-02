/* eslint-disable no-unused-vars */
import {Form, Input, InputNumber, Select} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {addProduct} from '../../features/products/productSlice';
import ImageUploader from 'react-images-upload';
import {selectListCategory} from '../../features/category/categorySlice';
import {Option} from 'antd/lib/mentions';
import GetBase64 from '../../utils/getbase64';


/**
 *
 * @param {*} props
 * @return {*}
 */
function AddProduct(props) {
  const {submit} = props;
  const onClose = typeof props.onClose == 'function' ?
    props.onClose :
    () => {};

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const categories = useSelector(selectListCategory);

  const handleOk = async () => {
    try {
      // form.submit();
      // const values = await form.validateFields();
      const formData = form.getFieldsValue();
      console.log(formData);
      await dispatch(addProduct(formData));

      onClose();
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const onDrop = (thumbnail) => {
    setTimeout(async () => {
      if (thumbnail && thumbnail[0]) {
        const base64 = await GetBase64(thumbnail[0]);
        form.setFieldsValue({image: base64});
      } else {
        form.setFieldsValue({image: null});
      }
    }, 500);
  };

  useEffect(() => {
    if (submit != 0) handleOk();
  }, [submit]);

  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
  };
  const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
  };


  return (
    <div className="container">
      <Form {...layout} name="basic" form={form} onFinish={handleOk}
        className='form-add-lesson'
      >
        <Form.Item
          label="Product name"
          name="name"
          rules={[{required: true, message: 'Product name is required'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Cost"
          name="cost"
          rules={[{required: true, message: 'Product price is required'}]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <ImageUploader
            withIcon={false}
            singleImage={true}
            withPreview={true}
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{required: true, message: 'Category is required'}]}
        >
          <Select
            showSearch
            placeholder="Select category"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            style={{width: '100%'}}
          >
            {categories.map((d) => (
              <Option key={d._id}>{d.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{required: true, message: 'Description is required'}]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddProduct;
