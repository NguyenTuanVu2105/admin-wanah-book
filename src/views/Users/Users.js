import React from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import AddAntDesign from './AddAntDesign';

const { Column } = Table;

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
                  <Table dataSource={this.state.persons}>
                    <Column title="Email" dataIndex="email" id="email" />
                    <Column title="First Name" dataIndex="profile.first_name" id="first_name" />
                    <Column title="Last Name" dataIndex="profile.last_name" id="last_name" />
                    <Column title="Description" dataIndex="profile.description" id="description" />
                    <Column title="Address" width="30%" dataIndex="profile.address_detail" id="address_detail" />
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