import React from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';

import store from "./redux/redux-store";
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspens } from './hoc/withSuspans';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized)
            return <Preloader />
        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/'
                            render={() =><Redirect to={"/profile"} />} />
                        <Route path='/dialogs'
                            render={withSuspens(DialogsContainer)} />
                        <Route path='/profile/:id?'
                            render={withSuspens(ProfileContainer)} />
                        <Route path='/users'
                            render={() => <UsersContainer pageTitle="UserPage"/>} />
                        <Route path='/login'
                            render={() => <Login />} />
                        <Route path='*'
                            render={() => <div> 404 Not Found </div>} />
                    </Switch>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}
export default MainApp