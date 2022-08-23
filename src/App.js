
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import PrivateVendorRoute from './components/auth/privateRoute'
import Login from './components/auth/login'
import Customers from '../src/pages/customers'
import Project from "./pages/projects";
import Product from "./pages/product";
import Panel from './pages/panel'
import Panelpage from './pages/panelpage'
import Profile from './pages/UserProfile'
import Ticket from './pages/tickets'
import TicketView from './pages/tickets/ticketviewer'
import Broadcast from './pages/broadcast'

function App() {

  // let { path } = useRouteMatch();
  
  return (  
  
  <Router>
    <main className="App">

    <Route path="/auth/dashboard" component={Dashboard} exact/>
    <Route path="/" component={Login} exact/>
    
    
    <Route path="/auth/customers" component={Customers} exact/>
    <Route path="/auth/projects" component={Project} exact/>
    <Route path="/auth/projects/product/:id" component={Product} exact/>
    <Route path="/auth/panel/:id"  component={Panel} exact />
    <Route path="/auth/panelpage/:id"  component={Panelpage} exact />
    <Route path="/auth/profile"  component={Profile} exact />
    <Route path="/auth/ticket"  component={Ticket} exact />
    <Route path="/auth/ticketviewer/:id"  component={TicketView} exact />
    <Route path="/auth/broadcast" component={Broadcast} exact/>
    
     </main>
    </Router>
  );
}

export default App;
