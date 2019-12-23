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

  async componentDidMount() {
    await axios.get(`http://localhost:5000/api/book/all?limit=10&page=1`).then(res => {
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
                  <i className="fa fa-align-justify"></i> Books <small className="text-muted">example</small>
                </CardHeader>
                <CardBody>
                  <AddAntDesign></AddAntDesign>
                  <Table dataSource={this.state.persons}>
                    <Column title="ID" dataIndex="id" id="id" />
                    <Column title="Name" dataIndex="name" id="email" />
                    <Column title="Publisher" dataIndex="publisher" id="publisher" />
                    <Column title="Description" dataIndex="description" id="description" />
                    <Column title="Star" dataIndex="star" id="star" />
                    <Column
                      title="Action"
                      id="action"
                      width="10%"
                      render={(text, record) => (
                        <span>
                          <Button>Edit</Button>
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