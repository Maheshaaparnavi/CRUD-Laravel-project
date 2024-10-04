
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav"; 
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import EditProduct from "./components/product/edit.component";
import ProductList from "./components/product/list.component";
import CreateProduct from "./components/product/create.component";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic Crud App
        </Link>
        {/* Navigation links for Login and Register */}
        <Nav className="ms-auto"> {/* Use ms-auto to push items to the right */}
            <Link to={"/login"} className="nav-link text-white">
              Login
            </Link>
            <Link to={"/register"} className="nav-link text-white">
              Register
            </Link>
          </Nav>
      </Container>
    </Navbar>
    {/* Full viewport background image container */}
    <div
        style={{
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ao4_xXwLsaug0cBpehxuCf36VIG573BRzQ&s')", // Your image URL
          backgroundSize: 'cover', // Ensures the image covers the entire container
          backgroundPosition: 'center', // Centers the background image
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          minHeight: '100vh', // Sets a minimum height for the container
          paddingTop: '56px', // Add space for the navbar height
        }}
      >
         <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route exact path='/' element={<ProductList />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </Col>
      </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
