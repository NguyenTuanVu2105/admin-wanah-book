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

  fetchData = async () => {
    await axios.get(`http://localhost:5000/api/category/all?limit=10&page=1`).then(res => {
      const persons = res.data;
      this.setState({persons});
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Categories <small className="text-muted">example</small>
                </CardHeader>
                <CardBody>
                  <AddAntDesign fetchData={this.fetchData}></AddAntDesign>
                  <Table dataSource={this.state.persons} style={{width: '40%'}}>
                    <Column title="ID" dataIndex="id" id="id" />
                    <Column title="Name" dataIndex="name" id="email" />
                    <Column
                      title="Action"
                      id="action"
                      width="40%"
                      render={(text, record) => (
                        <span>
                          <Button>Edit</Button>
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