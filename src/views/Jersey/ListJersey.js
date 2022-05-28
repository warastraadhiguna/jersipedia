import { deleteJersey } from "actions/JerseyAction";
import { getJerseyList } from "actions/JerseyAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import swal from "sweetalert";

class ListJersey extends Component {
  componentDidMount() {
    this.props.dispatch(getJerseyList());
  }

  componentDidUpdate(prevProps) {
    const { deleteJerseyResult } = this.props;
    if (
      deleteJerseyResult &&
      prevProps.deleteJerseyResult !== deleteJerseyResult
    ) {
      swal("Success!", deleteJerseyResult, "success");
      this.props.dispatch(getJerseyList());
    }
  }

  removeData = (images, key) => {
    this.props.dispatch(deleteJersey(images, key));
  };

  render() {
    const { getJerseyLoading, getJerseyResult, getJerseyError } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Jersey</CardTitle>
                <Link
                  to="/admin/jersey/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Jersey
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Foto</th>
                      <th>Nama Jersey</th>
                      <th>Harga</th>
                      <th>Berat</th>
                      <th>Jenis</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getJerseyResult ? (
                      Object.keys(getJerseyResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getJerseyResult[key].gambar[0]}
                              width="100"
                              alt={getJerseyResult[key].nama}
                            />
                          </td>
                          <td>{getJerseyResult[key].nama}</td>
                          <td>Rp. {getJerseyResult[key].harga}</td>
                          <td>{getJerseyResult[key].berat} kg</td>
                          <td>{getJerseyResult[key].jenis}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/jersey/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getJerseyResult[key].gambar,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getJerseyLoading ? (
                      <tr>
                        <td colSpan={6} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getJerseyError ? (
                      <tr>
                        <td colSpan={6} align="center">
                          {getJerseyError}
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
  getJerseyLoading: state.JerseyReducer.getJerseyLoading,
  getJerseyResult: state.JerseyReducer.getJerseyResult,
  getJerseyError: state.JerseyReducer.getJerseyError,

  deleteJerseyLoading: state.JerseyReducer.deleteJerseyLoading,
  deleteJerseyResult: state.JerseyReducer.deleteJerseyResult,
  deleteJerseyError: state.JerseyReducer.deleteJerseyError,
});

export default connect(mapStateToProps, null)(ListJersey);
