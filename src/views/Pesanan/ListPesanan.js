import { getPesananList } from "actions/PesananAction";
import { Pesanans } from "components";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { numberWithCommas } from "utils";

class ListPesanan extends Component {
  componentDidMount() {
    this.props.dispatch(getPesananList());
  }

  render() {
    const { getPesananLoading, getPesananResult, getPesananError } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Pesanan</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Tanggal & Order ID</th>
                      <th>Pesanan</th>
                      <th>Status</th>
                      <th>Total Harga</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPesananResult ? (
                      Object.keys(getPesananResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <p>Tanggal : {getPesananResult[key].tanggal}</p>
                            <p>Order ID:{getPesananResult[key].order_id}</p>
                          </td>
                          <td>
                            <Pesanans
                              pesanans={getPesananResult[key].pesanans}
                            />
                          </td>
                          <td>{getPesananResult[key].status}</td>
                          <td align="right">
                            <p>
                              Total Harga : Rp.
                              {numberWithCommas(
                                getPesananResult[key].totalHarga
                              )}
                            </p>
                            <p>
                              Ongkir : Rp.
                              {numberWithCommas(getPesananResult[key].ongkir)}
                            </p>
                            <p>
                              <strong>
                                Ongkir : Rp.
                                {numberWithCommas(
                                  getPesananResult[key].totalHarga +
                                    getPesananResult[key].ongkir
                                )}
                              </strong>
                            </p>
                          </td>
                          <td>
                            <a
                              href={getPesananResult[key].url}
                              className="btn btn-primary"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i class="nc-icon nc-money-coins"></i> Midtrans
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : getPesananLoading ? (
                      <tr>
                        <td colSpan={6} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getPesananError ? (
                      <tr>
                        <td colSpan={6} align="center">
                          {getPesananError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={6} align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getPesananLoading: state.PesananReducer.getPesananLoading,
  getPesananResult: state.PesananReducer.getPesananResult,
  getPesananError: state.PesananReducer.getPesananError,
});

export default connect(mapStateToProps, null)(ListPesanan);
