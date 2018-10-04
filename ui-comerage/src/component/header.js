import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Login from './login';
import Register from './register';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LogUser, RegUser, Logout } from '../action/index';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            register: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleLog = this.handleLog.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleLogout() {
        this.props.Logout()
    }
    loginUser(e) {
        this.toggle();
        const email = e.target.email.value;
        const password = e.target.password.value;
        this.props.LogUser(email, password)
        e.preventDefault();
        return false;
    }
    registerUser(e) {
        this.toggle();
        const name = e.target.nickname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        this.props.RegUser(name, email, password)
        e.preventDefault();
        return false;
    }

    handleLog() {
        this.setState({
            register: !this.state.register
        })
    }
    render() {
        return (
            <div>
                <div className="navbar">
                    <Link to="/">Acceuil</Link>
                    {this.props.user.token ? <button onClick={this.handleLogout}>{`Se deconnecter ${this.props.user.name}`}</button> : <button onClick={this.toggle}>Indentification</button>}
                </div>
                <div className="bandeau">
                    <h2 className="text-center">Bienvenue sur Comérage</h2>
                    <h4 className="text-center">Le premier site de ladit lafait de la réunion</h4>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Se connecter</ModalHeader>
                    <ModalBody>
                        {this.state.register ? <Register handleSubmit={(e) => this.registerUser(e)} /> : <Login handleSubmit={(e) => this.loginUser(e)} />}

                    </ModalBody>
                    <ModalFooter>
                        {this.state.register ? <Button color="primary" onClick={this.handleLog}>Deja un compte</Button> : <Button color="primary" onClick={this.handleLog}>Pas de compte ?</Button>}

                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        LogUser,
        RegUser,
        Logout,
    }, dispatch)
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);