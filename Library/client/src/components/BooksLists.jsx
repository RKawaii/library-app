import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardText,
  CardTitle,
  CardHeader,
  Button,
  Row,
  Col
} from 'reactstrap';

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [], skip: 0 };
  }
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    let page = this.props.match.params.page;
    if (page === undefined) {
      page = 0;
    } else page++;
    console.log(page);
    axios
      .get(`http://localhost:4000/library/getBooks/${0}`)
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getSkip = page => {
    var skips = (page - 1) * 5;
    return skips;
  };

  nextPage = () => {
    let page = this.props.match.params.page;
    if (page === undefined) {
      page = 0;
    } else page++;
    console.log(page);

    if (
      Object.entries(this.props.match.params).length === 0 &&
      this.props.match.params.constructor === Object
    ) {
      console.log('if');
    } else {
      console.log('else');

      let skips = this.getSkip(page);

      this.setState({ skip: skips });
    }
    axios
      .get(`http://localhost:4000/library/getBooks/${this.state.skip}`)
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  bookListing = () => {
    return this.state.books.map(function(data, i) {
      return (
        <div key={i}>
          <Card>
            <CardHeader>{data.Title}</CardHeader>
            <CardBody>
              <CardText>
                {data.Description ? data.Description : 'no Desc...'}
              </CardText>
              <Button>pinjam</Button>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  render() {
    return (
      <Container className="cardBody">
        <CardColumns>{this.bookListing()}</CardColumns>
        <Row>
          <Col />
          <Col sm="2">
            <Button color="dark" onClick={this.nextPage}>
              next
            </Button>
          </Col>
        </Row>
        {/*{terw()}*/}
      </Container>
    );
  }
}

export default BooksList;
