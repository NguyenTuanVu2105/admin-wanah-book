import React from 'react';
import { Button, Modal, Form, Input, Select, Icon } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select;
      function handleChange(value) {
        console.log(`selected ${value}`);
      }
      return (
        <Modal
          visible={visible}
          title="Create a new book"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input the name of book!' }],
              })(<Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password')(<Input type="password" 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />)}
            </Form.Item>
            <Form.Item label="Confirm Password">
              {getFieldDecorator('cfpassword')(<Input type="password" 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              />)}
            </Form.Item>
            <Form.Item label="First Name">
              {getFieldDecorator('first_name')(<Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Last Name">
              {getFieldDecorator('last_name')(<Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Address">
              {getFieldDecorator('address')(<Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Categories">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select one country"
                defaultValue={['china']}
                onChange={handleChange}
                optionLabelProp="label"
              >
                <Option value="china" label="China">
                  <span role="img" aria-label="China">
                    🇨🇳
                  </span>
                  China (中国)
                </Option>
                <Option value="usa" label="USA">
                  <span role="img" aria-label="USA">
                    🇺🇸
                  </span>
                  USA (美国)
                </Option>
                <Option value="japan" label="Japan">
                  <span role="img" aria-label="Japan">
                    🇯🇵
                  </span>
                  Japan (日本)
                </Option>
                <Option value="korea" label="Korea">
                  <span role="img" aria-label="Korea">
                    🇰🇷
                  </span>
                  Korea (韩国)
                </Option>
              </Select>
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