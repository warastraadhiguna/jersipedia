import { tambahJersey } from "actions/JerseyAction";
import { uploadJersey } from "actions/JerseyAction";
import { getLigaList } from "actions/LigaAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class TambahJersey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDb1: false,
      imageToDb2: false,

      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukuran: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      liga: "",
      ready: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(getLigaList());
  }

  componentDidUpdate(prevProps) {
    const { uploadJerseyResult, tambahJerseyResult } = this.props;
    if (
      uploadJerseyResult &&
      prevProps.uploadJerseyResult !== uploadJerseyResult
    ) {
      this.setState({
        [uploadJerseyResult.imageToDB]: uploadJerseyResult.image,
      });
      swal("Berhasil!", "Gambar berhasil ditambahkan", "success");
    }

    if (
      tambahJerseyResult &&
      prevProps.tambahJerseyResult !== tambahJerseyResult
    ) {
      swal("Berhasil!", "Data berhasil ditambahkan", "success");
      this.props.history.push("/admin/jersey");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const checked = event.target.checked;
    if (checked) {
      this.setState({
        ukuranSelected: [...this.state.ukuranSelected, event.target.value],
      });
    } else {
      const ukuranBaru = this.state.ukuranSelected
        .filter((ukuran) => ukuran !== event.target.value)
        .map((ukuran) => ukuran);
      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(uploadJersey(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const {
      berat,
      harga,
      nama,
      liga,
      ukuranSelected,
      jenis,
      imageToDb1,
      imageToDb2,
    } = this.state;

    event.preventDefault();

    if (
      nama &&
      liga &&
      harga &&
      berat &&
      ukuranSelected &&
      jenis &&
      imageToDb1 &&
      imageToDb2
    ) {
      //action
      this.props.dispatch(tambahJersey(this.state));
    } else {
      swal("Failed", "Maaf semua form wajib diisi", "error");
    }
  };

  render() {
    const {
      image1,
      image2,
      nama,
      harga,
      berat,
      jenis,
      ukuran,
      ready,
      liga,
      imageToDb1,
      imageToDb2,
    } = this.state;
    const { getLigaResult, tambahJerseyLoading } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/jersey" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Tambah Jersey</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md="6">
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Foto Jersey (Depan)"
                          />
                          <FormGroup>
                            <label>Foto Jersey (Depan)</label>
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDb1")
                              }
                            />
                          </FormGroup>
                          {image1 !== DefaultImage ? (
                            imageToDb1 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Selesai
                                upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Sedang
                                upload
                              </p>
                            )
                          ) : (
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum Upload
                            </p>
                          )}
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Jersey (Belakang)"
                          />
                          <FormGroup>
                            <label>Foto Jersey (Belakang)</label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDb2")
                              }
                            />
                          </FormGroup>
                          {image2 !== DefaultImage ? (
                            imageToDb2 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Selesai
                                upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Sedang
                                upload
                              </p>
                            )
                          ) : (
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum Upload
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Nama</label>
                        <Input
                          type="text"
                          name="nama"
                          value={nama}
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Liga</label>
                            <Input
                              type="select"
                              name="liga"
                              value={liga}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value="">--Pilih--</option>
                              {Object.keys(getLigaResult).map((key) => (
                                <option key={key} value={key}>
                                  {getLigaResult[key].namaLiga}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Harga (Rp.)</label>
                            <Input
                              type="number"
                              name="harga"
                              value={harga}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Berat (kg)</label>
                            <Input
                              type="number"
                              name="berat"
                              value={berat}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              name="jenis"
                              value={jenis}
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <label>Ukuran</label>
                          <FormGroup check>
                            {ukuran.map((ukuran, index) => (
                              <Label key={index} check className="mr-2">
                                <Input
                                  type="checkbox"
                                  value={ukuran}
                                  onChange={(event) => this.handleCheck(event)}
                                />
                                {ukuran}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              name="ready"
                              value={ready}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {tambahJerseyLoading ? (
                        <Button
                          color="primary"
                          disabled
                          className="float-right"
                        >
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
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

  uploadJerseyLoading: state.JerseyReducer.uploadJerseyLoading,
  uploadJerseyResult: state.JerseyReducer.uploadJerseyResult,
  uploadJerseyError: state.JerseyReducer.uploadJerseyError,

  tambahJerseyLoading: state.JerseyReducer.tambahJerseyLoading,
  tambahJerseyResult: state.JerseyReducer.tambahJerseyResult,
  tambahJerseyError: state.JerseyReducer.tambahJerseyError,
});

export default connect(mapStateToProps, null)(TambahJersey);
