import { deleteLiga } from "actions/LigaAction";
import { getLigaList } from "actions/LigaAction";
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

class ListLiga extends Component {
  componentDidMount() {
    this.props.dispatch(getLigaList());
  }

  componentDidUpdate(prevProps) {
    const { deleteLigaResult } = this.props;
    if (deleteLigaResult && prevProps.deleteLigaResult !== deleteLigaResult) {
      swal("Success!", deleteLigaResult, "success");
      this.props.dispatch(getLigaList());
    }
  }

  removeData = (image, id) => {
    this.props.dispatch(deleteLiga(image, id));
  };

  render() {
    const { getLigaLoading, getLigaError, getLigaResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Liga</CardTitle>
                <Link
                  to="/admin/liga/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Liga
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Liga</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLigaResult ? (
                      Object.keys(getLigaResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getLigaResult[key].image}
                              width="100"
                              alt={getLigaResult[key].namaLiga}
                            />
                          </td>
                          <td>{getLigaResult[key].namaLiga}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/liga/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(getLigaResult[key].image, key)
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getLigaLoading ? (
                      <tr>
                        <td colSpan={3} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getLigaError ? (
                      <tr>
                        <td colSpan={3} align="center">
                          {getLigaError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={3} align="center">
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
  getLigaLoading: state.LigaReducer.getLigaLoading,
  getLigaResult: state.LigaReducer.getLigaResult,
  getLigaError: state.LigaReducer.getLigaError,

  deleteLigaLoading: state.LigaReducer.deleteLigaLoading,
  deleteLigaResult: state.LigaReducer.deleteLigaResult,
  deleteLigaError: state.LigaReducer.deleteLigaError,
});

export default connect(mapStateToProps, null)(ListLiga);
