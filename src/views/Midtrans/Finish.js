import { updatePesanan } from "actions/PesananAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import Logo from "../../assets/img/logoUtama.svg";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    if (order_id && transaction_status) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });
      this.props.dispatch(updatePesanan(order_id, transaction_status));
    }
  }

  toHistory = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };

  render() {
    const { order_id, transaction_status } = this.state;
    const { updatePesananLoading } = this.props;
    return (
      <Row className="justify-content-center mt-5">
        {updatePesananLoading ? (
          <Spinner color="primary" />
        ) : (
          <Col md="4" className="mt-5">
            <img
              src={Logo}
              className="rounded mx-auto d-block"
              alt="Logo Utama"
            />
            <Card>
              <CardHeader tag="h4" align="center">
                Selamat Transaksi Anda Selesai
              </CardHeader>
              <CardBody className="text-center">
                <p>
                  {transaction_status === "pending" &&
                    "Untuk selanjutnya silahkan selesaikan pembayaran dan update status pembayaran di halaman history"}
                </p>

                <p>Order Id = {order_id}</p>
                <p>
                  Status ={" "}
                  {transaction_status === "settlement" ||
                  transaction_status === "capture"
                    ? "lunas"
                    : transaction_status}
                </p>

                <Button
                  color="primary"
                  type="submit"
                  onClick={() => this.toHistory()}
                >
                  Lanjutkan
                </Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  updatePesananLoading: state.PesananReducer.updatePesananLoading,
  updatePesananResult: state.PesananReducer.updatePesananResult,
  updatePesananError: state.PesananReducer.updatePesananError,
});

export default connect(mapStateToProps, null)(Finish);
