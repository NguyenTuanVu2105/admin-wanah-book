import React from 'react';
import axios from 'axios';
import { Table, Tag, Button } from 'antd';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import AddAntDesign from './AddAntDesign';

const { Column } = Table;
const data = [
  {
    id: 1,
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Brown',
    address: 'New York No. 1 Lake Park asdasdasd',
    category: ['Kinh dị', 'Hành động', 'Tâm lý', 'Hài hước'],
  },
  {
    id: 2,
    email: 'test2@gmail.com',
    firstName: 'Jim',
    lastName: 'Green',
    address: 'London No. 1 Lake Park asdasdasdasdasd',
    category: ['loser'],
  },
  {
    id: 3,
    email: 'test3@gmail.com',
    firstName: 'Joe',
    lastName: 'Black',
    address: 'Sidney No. 1 Lake Park sdgfgdfgsgdfsg',
    category: ['cool', 'teacher'],  
  },
];

export default class Users extends React.Component {

  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/user/all?limit=10&page=1`).then(res => {
      const persons = res.data;
      this.setState({persons});
    })
  }

  render() {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
                </CardHeader>
                <CardBody>
                  <AddAntDesign></AddAntDesign>
                  <ul>
                    { this.state.persons.map(person => <li>{person.first_name}</li>)}
                  </ul>
                  <Table dataSource={data}>
                    <Column title="First Name" dataIndex="firstName" id="firstName" />
                    <Column title="Last Name" dataIndex="lastName" id="lastName" />
                    <Column title="Address" width="30%" dataIndex="address" id="address" />
                    <Column
                      title="Category"
                      dataIndex="category"
                      id="category"
                      width="30%"
                      render={category => (
                        <span>
                          {category.map(tag => (
                            <Tag color="blue" id={tag}>
                              {tag}
                            </Tag>
                          ))}
                        </span>
                      )}
                    />
                    <Column
                      title="Action"
                      id="action"
                      width="10%"
                      render={(text, record) => (
                        <span>
                          <Button>Delete</Button>
                        </span>
                      )}
                    />
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
  }

}