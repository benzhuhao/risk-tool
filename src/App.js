import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from './router/index'
import RiskMatrix from './router/RiskMatrix'
import GlobalStateProvider from './components/GlobalReducer/GlobalState'
import MyForm from './components/Editor'
import TestForm from './components/Editor/TestForm'
import ButtonAppBar from './components/Appbar';

function App(props) {
    return (
        <div className="App">
            <Router>
                <GlobalStateProvider>
                    <ButtonAppBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/riskMatrix" component={RiskMatrix} />
                        <Route path="/editor" component={MyForm} />
                        <Route path="/test" component={TestForm} />
                    </Switch>
                </GlobalStateProvider>
            </Router>
        </div>
    );
}

export default App;
