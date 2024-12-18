import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Feed from '../components/Feed';

const MainFeedLayout = () => {
    return (
        <div style={{ backgroundColor: '#e3eef8' }}>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col md={9} className='p-4'>
                        <Feed />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainFeedLayout;