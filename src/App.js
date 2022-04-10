import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './components/DirectoryComponent';
import './App.css';
import { CAMPSITES} from './shared/campsites'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }
  render() {
      return (
          <div className="App">
              <Navbar dark color="primary">
              <div className="container">
                  <NavbarBrand href="/">NuCamp</NavbarBrand>
              </div>
              </Navbar>
              <Directory campsites={this.state.campsites} />
              {/* <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}/> */}
          </div>
      );
  }
}

export default App;
