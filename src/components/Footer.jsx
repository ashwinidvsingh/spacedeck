import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

function Footer() {
  return (
    <>
        <footer className="bg-light py-3">
          <Container>
            <Row>
              <Col className="text-center text-muted">
                &copy; 2025 My Website. All rights reserved.
              </Col>
            </Row>
          </Container>
        </footer>
    </>
)
}

export default Footer