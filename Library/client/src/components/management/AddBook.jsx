import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import { MdClear } from 'react-icons/md';
import axios from 'axios';
import '../assets/manageForm.css';

const AddBook = () => {
  const [State, setState] = useState({
    Title: '',
    Author: '',
    Publisher: '',
    PublishDate: ''
  });

  const [fileNm, setFileNm] = useState('Choose File');
  const [FileCond, setFileCond] = useState(false);
  const [File, setFile] = useState({});
  const [FilePrev, setFilePrev] = useState();

  const handleClear = () => {
    setFile({});
    setFileNm('Choose File');
    setFileCond(false);
    setFilePrev(null);
  };

  const FileChange = e => {
    console.log(e.target.files[0]);

    setFile(e.target.files[0]);
    setFileCond(true);
    setFilePrev(URL.createObjectURL(e.target.files[0]));
    setFileNm(e.target.files[0].name);
  };
  const handleChange = e => {
    setState({ ...State, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    try {
      axios
        .post('http://localhost:4000/library/manage-book/add', State)
        .then(res => {
          if (FileCond) {
            console.log(File);

            var imgData = new FormData();
            imgData.append('file', File);
            console.log(imgData);
            try {
              axios.post(
                'http://localhost:4000/library/manage-book/add-image',
                imgData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    name: res.data
                  }
                }
              ); /** */
            } catch (error) {}
          } else console.log('file not appended');
        })
        .catch(err => {
          console.error(err);
        });
    } catch (err) {}
  };
  return (
    <div className="fluid-container m-4" id="form">
      <Row>
        <Col sm="1" />
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title*</Label>
              <Input
                type="text"
                name="Title"
                className="form-control"
                placeholder="enter title"
                onChange={handleChange}
                value={State.Title}
              />
            </FormGroup>
            <FormGroup>
              <Label>Author*</Label>
              <Input
                type="text"
                name="Author"
                className="form-control"
                placeholder="enter Author Name"
                onChange={handleChange}
                value={State.Author}
              />
            </FormGroup>
            <FormGroup>
              <Label>Image</Label>
              <div className="input-group">
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={handleClear}>
                    <MdClear />
                  </button>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={FileChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {fileNm}
                  </label>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Volume</Label>
              <Input
                name="Volume"
                type="number"
                id=""
                placeholder="enter Volume Here"
                onChange={handleChange}
                value={State.Volume || ''}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                name="Description"
                type="textarea"
                id=""
                placeholder="enter description here"
                onChange={handleChange}
                value={State.Description || ''}
              />
            </FormGroup>
            <FormGroup>
              <Label>Publisher*</Label>
              <Input
                type="text"
                name="Publisher"
                className="form-control"
                placeholder="enter Publisher"
                onChange={handleChange}
                value={State.Publisher}
              />
            </FormGroup>
            <FormGroup>
              <Label>Publish Date*</Label>
              <Input
                type="date"
                name="PublishDate"
                id="exampleDate"
                onChange={handleChange}
                value={State.PublishDate}
              />
            </FormGroup>
            <small style={{ color: 'muted' }}>* = must be filled</small>
            <Row>
              <Col />
              <Col>
                <Button sm="5" type="submit" color="dark" block>
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <img
            src={FilePrev}
            alt="file preview here"
            style={{ width: '379px', height: '512px' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddBook;
