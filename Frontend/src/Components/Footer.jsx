import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Style/Footer.css'; // Import custom styles

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We provide high-quality educational tools to empower students and educators.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>mail: samikshakene00@gmail.com</p>
            <p>Phone: +91-9021946162</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col className="text-center">
              <p>&copy; 2025 SummarifyPro. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
