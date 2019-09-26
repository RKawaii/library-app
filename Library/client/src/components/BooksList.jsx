import React, { Component } from 'react';
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

export default class BooksList extends Component {
  constructor(props) {
    super(props);
    console.log('contstruct');
    //this.state = { page: '', books: [], skip: 0 };
    this.page = 0;
    this.books = [];
    this.skip = 0;
  }

  componentWillMount() {
    console.log('willmount');

    axios
        .get(`http://localhost:4000/library/getBooks/${1}`)
        .then(response => {
          
          this.books = response.data;
          //this.setState({ books: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  getBooksData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/library/getBooks/${1}`
      );
      this.books = response.data;
      //this.setState({ books: response.data });
    } catch (error) {
      console.log(error);
    }
    
  };

  componentDidMount(){
    console.log(this.books);
    
  }

  bookListing = () => {
    return this.books.map(function(data, i) {
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

  componentWillReceiveProps(nextProps) {
    console.log('recieve props', nextProps);

    try {
      axios
        .get(`http://localhost:4000/library/getBooks/${1}`)
        .then(response => {
          this.books = response.data;
          //this.setState({ books: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('render');

    return (
      <Container className="cardBody">
        <CardColumns>{this.bookListing()}</CardColumns>
      </Container>
    ); /** */
  }
}
