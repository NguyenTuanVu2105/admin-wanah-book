import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Icon } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Create a new book"
          okText ='Create'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Book Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of book!' }],
              })(<Input placeholder="Book Name"  prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Publisher">
              {getFieldDecorator('publisher')(<Input placeholder="Publisher"
                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description')(<Input placeholder="Description"  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class AddAntDesign extends React.Component {

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      axios.post(
        'http://localhost:5000/api/admin/books/add',
        {...values, star: 0},
      )
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" style={{marginBottom: '20px'}} onClick={this.showModal}>
          Add Book
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default AddAntDesign;