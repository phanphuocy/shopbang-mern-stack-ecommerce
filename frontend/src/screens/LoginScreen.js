import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Đăng Nhập</h1>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : loading ? (
        <Loader />
      ) : null}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Mật Khẩu</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button type="submit" variant="primary">
            ĐĂNG NHẬP
          </Button>
          <Row className="py-3">
            <Col>
              Chưa có tài khoản? Bạn có thể tạo mới tại{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                đây.
              </Link>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
