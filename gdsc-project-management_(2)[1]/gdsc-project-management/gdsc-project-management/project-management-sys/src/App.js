import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/protected" component={ProtectedPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/admin" component={AdminPanel} />
            </Switch>
        </Router>
    );
};

export default App;
