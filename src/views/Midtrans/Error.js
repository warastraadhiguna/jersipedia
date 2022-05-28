import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Logo from "../../assets/img/logoUtama.svg";

export default class Error extends Component {
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <img
            src={Logo}
            className="rounded mx-auto d-block"
            alt="Logo Utama"
          />
          <Card>
            <CardHeader tag="h4" align="center">
              Maaf transaksi anda gagal. silahkan coba lagi
            </CardHeader>
            <CardBody className="text-center">
              <p>Order Id = {order_id}</p>
              <p>Status = {transaction_status}</p>

              <Button color="primary" type="submit">
                Lanjutkan
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
