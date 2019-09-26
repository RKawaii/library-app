import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import BooksList from './BooksList';

class Books extends Component {
  constructor(props) {
    super(props);
    var page = props.match.params.page;
    if (page === undefined || page < 1) {
      page = 1;
    }
    this.state = { redir: null, page: page, skip: this.skip() };
  }

  getSkip = page => {
    var skips = (page - 1) * 5;
    return skips;
  };

  skip = () => {
    var res = 0;
    if (
      !(
        Object.entries(this.props.match.params).length === 0 &&
        this.props.match.params.constructor === Object
      )
    ) {
      if (this.props.match.params.page > 0) {
        res = this.getSkip(this.props.match.params.page);
      }
    }
    return res;
  };

  handleNextPageBtn = e => {
    let pg = this.state.page + 1;

    this.setState({ redir: pg });

    setTimeout(() => {
      this.setState({ redir: '' });
      console.log(this.state);
    }, 1);
  };

  handleRedir = a => {
    if (a) {
      return <Redirect to="/" />;
    } else return null;
  };

  shouldComponentUpdate() {
    return true;
  }
  componentWillReceiveProps(nextProps) {
    console.log('props re',nextProps);
  }

  redir = () => {
    let res = null;
    if (this.state.redir === null) {
    } else {
      res = <Redirect to={`/Books/${this.state.redir}`} />;
    }
    return res;
  };

  handleNextPage = e => {
    e.preventDefault();
    this.handleRedir(true);
  };

  render() {
    console.log('render', this.state);

    return (
      <div>
        {this.redir()}
        <Row>
          <Col>bookslist</Col>
        </Row>
        <Row>
          <Col>
            <BooksList skip={this.state.skip} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" onClick={this.handleNextPageBtn}>
              next page
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Books;
