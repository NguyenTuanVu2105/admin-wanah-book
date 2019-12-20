import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i.toString(),
    name: `Book ${i}`,
    publisher: `Bublisher ${i}`,
    description: `Description ${i}`,
    star: `${i}`
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data, editingId: '' };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Publisher',
        dataIndex: 'publisher',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.publisher.length - b.publisher.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '35%',
        editable: true,
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Star',
        dataIndex: 'star',
        width: '10%',
        editable: true,
        sorter: (a, b) => a.star - b.star,
        sortDirections: ['descend'],
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '15%',
        render: (text, record) => {
          const { editingId } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button
                    onClick={() => this.save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                <Button>Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
            <Button disabled={editingId !== ''} onClick={() => this.edit(record.id)}>
              Edit
            </Button>
          );
        },
      },
    ];
  }

  isEditing = record => record.id === this.state.editingId;

  cancel = () => {
    this.setState({ editingId: '' });
  };

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingId: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingId: '' });
      }
    });
  }

  edit(id) {
    this.setState({ editingId: id });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'star' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const BookAntDesign = Form.create()(EditableTable);

export default BookAntDesign;