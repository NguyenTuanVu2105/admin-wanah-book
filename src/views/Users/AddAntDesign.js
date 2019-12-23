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
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input the email of new user!' }],
              })(<Input placeholder="Email"  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password')(<Input type="password" placeholder="Password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />)}
            </Form.Item>
            <Form.Item label="First Name">
              {getFieldDecorator('first_name')(<Input placeholder="Firt Name"  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('last_name')(<Input placeholder="Last Name"  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
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
        'http://localhost:5000/api/auth/signup',
        {...values, passwordConfirm: values.password},
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
          Add User
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