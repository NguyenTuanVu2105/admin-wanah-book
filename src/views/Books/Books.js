import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import AddAntDesign from './AddAntDesign';
import BookAntDesign from './BookAntDesign';

const Books = () => {
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
                <BookAntDesign></BookAntDesign>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default Books;
