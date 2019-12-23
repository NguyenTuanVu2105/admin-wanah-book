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
          title="Create a new author"
          okText ='Create'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Author Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of book!' }],
              })(<Input placeholder="Author Name"  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
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

  submitData = async (values) => {
    await axios.post(
        'http://localhost:5000/api/admin/author/add',
        {...values, star: 0},
      )
      this.props.fetchData();
  }

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
      
      this.submitData(values);

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
          Add Author
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