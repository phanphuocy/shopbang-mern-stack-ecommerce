import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { getOrderDetail, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ history, match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetail;

  const [sdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
    loading: loadingPay,
    error: errorPay,
  } = orderPay;

  useEffect(() => {
    // Customize Paypal script and add it to body
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // On mount
    if (!order || successPay) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch(getOrderDetail(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    } else {
      console.log("IS PAID");
    }
  }, [history, order, dispatch]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}
      {order && (
        <>
          <Row className="px-4">
            <h2>ORDER {order._id}</h2>
          </Row>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Vận Chuyển</h4>
                  <p>
                    <strong>Địa Chỉ:</strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city} ,{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  <p>
                    <strong>Người Đặt:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  {order.isDelivered && order.deliveredAt ? (
                    <Message variant="success">
                      Đã thanh toán vào {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="warning">Chưa Giao Hàng</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Thanh Toán</h4>
                  <p>
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {order.paymentMethod}
                  </p>
                  {order.isPaid && order.paidAt ? (
                    <Message variant="success">
                      Đã thanh toán vào {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant="warning">Chưa Thanh Toán</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Đơn Hàng</h4>
                  {order.orderItems.length === 0 ? (
                    <Message>Giỏ hàng của bạn đang trống.</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
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
                              {item.qty} x {item.price} ={" "}
                              {item.qty * item.price} VND
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
                      <Col>{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Phí vận chuyển</Col>
                      <Col>{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Thuế GTGT</Col>
                      <Col>{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tổng Cộng</Col>
                      <Col>{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amout={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}

                  {/* <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={order.orderItems.length <= 0}
                      onClick={placeOrderHandler}
                    >
                      Đặt Hàng
                    </Button>
                  </ListGroup.Item> */}
                  {error && (
                    <ListGroup.Item>
                      <Message variant="danger">{error}</Message>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
