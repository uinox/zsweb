import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Register from "./pages/login/Register";

function App(props){
  return (
    <BrowserRouter>
        <Route>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/' component={Admin} />
            </Switch>
        </Route>

    </BrowserRouter>
  );
}

export default connect(
  function mapStateToProps(state) {
      return state;
  },
  function mapDispatchToProps(dispatch) {
      return { dispatch };
  }
)(App);
