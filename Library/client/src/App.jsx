import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//import from err
import notFound from './components/err/notFound';
//imports from template
import Header from './components/template/Header';
//import from components
import Home from './components/Home';
//import BooksList from './components/BooksList';
import Books from './components/Books';
import AddBook from './components/management/AddBook';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Books" component={Books} />
          <Route exact path="/Books/:page" component={Books} />
          <Route exact path="/manage/add" component={AddBook} />
          <Route component={notFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
