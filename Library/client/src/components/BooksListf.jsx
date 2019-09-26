import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardBody,
  CardColumns,
  CardText,
  CardHeader,
  Button
} from 'reactstrap';

const BooksList = props => {
  const [Page, setPage] = useState(parseInt(props.page));
  const [Skip, setSkip] = useState();
  const [Books, setBooks] = useState([]);
  const getBooksData = () => {
    axios
      .get(`http://localhost:4000/library/getBooks/${1}`)
      .then(response => {
        //this.books = response.data;
        setBooks(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const bookListing = () => {
    return Books.map(function(data, i) {
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
  const Book = () => {
    console.log(Books);
    return <div>aaa</div>;
    return (
      <Container className="cardBody">
        <CardColumns />
      </Container>
    );
  };

  return <Book />;
};

export default BooksList;
