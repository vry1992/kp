import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { FlowSidebar } from '../FlowSidebar';
import { LoaderPortal } from '../Loader';
import { Sidebar } from '../Sidebar';

export function Layout({ page: Page }) {
  return (
    <section className="">
      <LoaderPortal />
      <Container fluid>
        <Row>
          <Col xl={2}>
            <FlowSidebar />
            <Sidebar />
          </Col>
          <Col xl={10}>
            <Page />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
