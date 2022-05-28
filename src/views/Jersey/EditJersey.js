import { getDetailJersey } from "actions/JerseyAction";
import { updateJersey } from "actions/JerseyAction";
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

class EditJersey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDb1: false,
      imageToDb2: false,
      imageLama1: false,
      imageLama2: false,
      nama: "",
      harga: 0,
      berat: 0,
      jenis: "",
      ukuran: ["S", "M", "L", "XL", "XXL"],
      ukuranSelected: [],
      liga: "",
      ready: false,
      editUkuran: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(getLigaList());
    this.props.dispatch(getDetailJersey(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { uploadJerseyResult, updateJerseyResult, detailJerseyResult } =
      this.props;
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
      updateJerseyResult &&
      prevProps.updateJerseyResult !== updateJerseyResult
    ) {
      swal("Berhasil!", "Data berhasil diubah", "success");
      this.props.history.push("/admin/jersey");
    }

    if (
      detailJerseyResult &&
      prevProps.detailJerseyResult !== detailJerseyResult
    ) {
      this.setState({
        nama: detailJerseyResult.nama,
        harga: detailJerseyResult.harga,
        berat: detailJerseyResult.berat,
        jenis: detailJerseyResult.jenis,
        ukuranSelected: detailJerseyResult.ukuran,
        liga: detailJerseyResult.liga,
        ready: detailJerseyResult.ready,
        image1: detailJerseyResult.gambar[0],
        image2: detailJerseyResult.gambar[1],
        imageLama1: detailJerseyResult.gambar[0],
        imageLama2: detailJerseyResult.gambar[1],
      });
    }
  }

  editUkuran = () => {
    this.setState({
      editUkuran: true,
      ukuranSelected: [],
    });
  };

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
    const { berat, harga, nama, liga, ukuranSelected, jenis } = this.state;

    event.preventDefault();

    if (nama && liga && harga && berat && ukuranSelected && jenis) {
      //action
      this.props.dispatch(updateJersey(this.state));
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
      ukuranSelected,
      editUkuran,
      imageLama1,
      imageLama2,
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
              <CardHeader tag="h4">Edit Jersey</CardHeader>
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
                          {image1 !== imageLama1 ? (
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
                          {image2 !== imageLama2 ? (
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
                          <label>
                            Ukuran tersedia sekarang: (
                            {ukuranSelected.map((item, index) => (
                              <strong key={index}> {item} </strong>
                            ))}
                            )
                          </label>
                          {editUkuran ? (
                            <>
                              <FormGroup check>
                                {ukuran.map((ukuran, index) => (
                                  <Label key={index} check className="mr-2">
                                    <Input
                                      type="checkbox"
                                      value={ukuran}
                                      onChange={(event) =>
                                        this.handleCheck(event)
                                      }
                                    />
                                    {ukuran}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                ))}
                              </FormGroup>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() =>
                                  this.setState({ editUkuran: false })
                                }
                              >
                                Simpan Ukuran
                              </Button>
                            </>
                          ) : (
                            <Button
                              color="warning"
                              size="sm"
                              onClick={() => this.editUkuran()}
                            >
                              Edit Ukuran
                            </Button>
                          )}
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

  updateJerseyLoading: state.JerseyReducer.updateJerseyLoading,
  updateJerseyResult: state.JerseyReducer.updateJerseyResult,
  updateJerseyError: state.JerseyReducer.updateJerseyError,

  detailJerseyLoading: state.JerseyReducer.detailJerseyLoading,
  detailJerseyResult: state.JerseyReducer.detailJerseyResult,
  detailJerseyError: state.JerseyReducer.detailJerseyError,
});

export default connect(mapStateToProps, null)(EditJersey);
