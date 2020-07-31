import React from 'react'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default (props) => {
    return (
        <section className={props.sectionClass}>
        <Container className={props.containerClass}>
            <Row className='align-content-center flex-column'>
              <Col xs={12}><h2 className='text-center title'>{props.title}</h2>
              </Col>
              <Col>
              <p className='subtitle px-3'>{props.subtitle}</p>
              </Col>
            </Row>
          <Row>
              {props.children}
          </Row>
        </Container>
      </section>
    )
}