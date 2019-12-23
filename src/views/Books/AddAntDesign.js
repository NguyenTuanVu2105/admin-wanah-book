import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Icon, Select } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {

    state = {
      selectedItems: [],
      selectedItems_Category: [],
      OPTIONS: [],
      OPTIONS_CATEGORY: [],
      persons: [],
      persons_category: [],
      file: ''
    };

    getAuthor = async (q) => {
      await axios.get(`http://localhost:5000/api/search/author?q=${q}`).then(res => {
        const persons = res.data;
        this.setState({OPTIONS: persons.map(x => {
          return {
            id: x.id,
            name: x.name
          }
        })});
      })
    }

    getCategory = async (q) => {
      await axios.get(`http://localhost:5000/api/search/category?q=${q}`).then(res => {
        const persons_category = res.data;
        this.setState({OPTIONS_CATEGORY: persons_category.map(x => {
          return {
            id: x.id,
            name: x.name
          }
        })});
      })
    }

    getImage
    handleChange = selectedItems => {
      console.log(selectedItems);
      this.setState({ selectedItems });
      this.props.setAuthors(selectedItems.map(x => {
        return {
        id: x
        }
    }));
    };

    handleChangeCategory = selectedItems_Category => {
      console.log(selectedItems_Category);
      this.setState({ selectedItems_Category });
      this.props.setCategories(selectedItems_Category.map(x => {
        return {
        id: x
        }
    }));
    };


    render() {
      const { selectedItems, selectedItems_Category, OPTIONS, OPTIONS_CATEGORY } = this.state;
      const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
      const filteredOptions_Category = OPTIONS_CATEGORY.filter(o => !selectedItems_Category.includes(o));
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      console.log(filteredOptions)
      console.log(filteredOptions_Category)
      return (
        <Modal
          visible={visible}
          title="Create a new book"
          okText ='Create'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" encType="multipart/form-data">
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
              {getFieldDecorator('description')(<Input placeholder="Description"  prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item label="Authors">
              <Select
                mode="multiple"
                placeholder="Author"
                value={selectedItems}
                onChange={this.handleChange}
                onSearch={value => this.getAuthor(value)}
                style={{ width: '100%' }}
              >
                {filteredOptions.map(item => (
                  <Select.Option key={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Categories">
              <Select
                mode="multiple"
                placeholder="Category"
                value={selectedItems_Category}
                onChange={this.handleChangeCategory}
                onSearch={value => this.getCategory(value)}
                style={{ width: '100%' }}
              >
                {filteredOptions_Category.map(item => (
                  <Select.Option key={item.name} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
                <Input type='file'  onChange={(evt) => {  
                evt.preventDefault();
                const formData = new FormData();
                formData.append('image', evt.target.files[0])
                console.log(evt.target.files[0])
                const config = {
                  headers: {
                      'content-type': 'multipart/form-data'
                  }
              }
              axios.post('http://localhost:5000/api/upload/book', formData, config)
               .then(result => {
                 console.log(result)
                 this.props.setFileImages(result.data.fileName)
               })
            }}></Input>

          </Form>
        </Modal>
      );
    }
  },
);

class AddAntDesign extends React.Component {

  state = {
    visible: false,
    authors: [],
    categories: [], 
    file: ''
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
      console.log({...values, authorId: this.state.authors, star: 0, image: this.state.file})
      // axios.post(
      //   'http://localhost:5000/api/admin/books/add',
      //   {...values, authorId: this.state.authors, star: 0, image: this.state.file},
      // )
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
          setAuthors = {(x) => {this.setState({authors: x})}}
          setCategories = {(x) => {this.setState({categories: x})}}
          setFileImages = {(x) => this.setState({file: x})}
        />
      </div>
    );
  }
}

export default AddAntDesign;