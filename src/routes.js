import React from 'react';
import {Route} from 'react-router-dom';

import Lablist from './containers/Lablist';
import Labdetail from './containers/Labdetail';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Equipmentlist from './containers/Equipmentlist';
import Equipmentdetail from './containers/Equipmentdetail';

const BaseRouter = () => (
  <div>
    <Route exact path="/labs" component={Lablist} />{" "}
    <Route exact path="/labs/:labID/" component={Labdetail} />{" "}
    <Route exact path="/equipment" component={Equipmentlist} />{" "}
    <Route exact path="/equipment/:equipmentID/" component={Equipmentdetail} />{" "}
    <Route exact path="/login" component={Login} />{" "}
    <Route exact path="/signup" component={Signup} />{" "}
    
  </div>
);
export default BaseRouter; 