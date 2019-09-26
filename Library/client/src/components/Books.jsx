import React, { useState } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import BookList from './BooksList';

const Books = props => {
  const [State, setState] = useState({ page: 0 });
  //console.log(State);

  const handleClickNext = () => {
    var newpage = State.page + 1;
    setState({ page: newpage });
  };

  const handleClickPrev = () => {
    var newpage = State.page - 1;
    setState({ page: newpage });
  };

  const panging = () => {
    return <p>{State.page}</p>;
  };

  return (
    <Container>
      <Row>
        <Col>a</Col>
        <Col>{panging()}</Col>
      </Row>
      <Row />
      <BookList page={State.page} />
      <Row>
        <Col>a</Col>
        <Col>
          <Button color="danger" onClick={handleClickPrev}>
            Prev
          </Button>
          <Button color="primary" onClick={handleClickNext}>
            next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Books;
