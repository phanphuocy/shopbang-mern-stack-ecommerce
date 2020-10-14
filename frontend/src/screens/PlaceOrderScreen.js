import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  cart.itemPrice = cart.cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );
  cart.shippingPrice = cart.itemPrice > 100 ? 0 : 100;
  cart.taxPrice = Math.floor(Number(0.15 * cart.itemPrice));
  cart.totalPrice =
    Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const placeOrderHandler = () => {
    //
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Vận Chuyển</h4>
              <p>
                <strong>Địa Chỉ:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} , {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Thanh Toán</h4>
              <strong>Phương thức thanh toán:</strong> {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Đơn Hàng</h4>
              {cart.cartItems.length === 0 ? (
                <Message>Giỏ hàng của bạn đang trống.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = {item.qty * item.price}{" "}
                          VND
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Đơn Hàng</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Giá trị đơn hàng</Col>
                  <Col>{cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Thuế GTGT</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng Cộng</Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length <= 0}
                  onClick={placeOrderHandler}
                >
                  Đặt Hàng
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
