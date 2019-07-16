import React, { Component } from 'react'
import{ Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authAction';

class Menu extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        // this.props.history.push('/login')
        window.location.href = "/"
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <div className="sixteen wide column" style={{'marginBottom':'20px'}}>
                <div className="ui small menu main_menu">
                    {
                        user.role === "student"?
                        <div className="item">
                            <Link to="/student_dashboard" className="ui labeled icon button"><i className="icon home"></i>Home</Link>
                        </div>:
                        <div className="item">
                            <Link to="/company_dashboard" className="ui labeled icon button"><i className="icon home"></i>Home</Link>
                        </div>
                    }
                    <div className="item">
                        <h3 style={{"color":"#e6f8d3"}}>{user.userName}</h3>
                    </div>
                    <div className="item">
                        <Link to={'/profile/'+user.userId} style={{"color":"#e6f8d3"}}>view profile</Link>
                    </div>
                    <div className="item right floated">
                        <Link  className="ui green button small" onClick={this.onLogoutClick.bind(this)} to="/login">{' '}log out</Link>
                    </div>
                </div>
            </div>
        );
        const guestLinks = (
            <div className="sixteen wide column" style={{'marginBottom':'20px'}}>
                <div className="ui large menu main_menu">
                    <div className="item">
                        <Link to="" className="ui small icon labeld button"><i className="icon home"></i>My project </Link>
                    </div>
                    <div className="right menu">
                        <div className="item">
                        <Link style={{"color":"white", "fontSize":"20px"}} to="/login">Login</Link>
                        </div>
                        <div className="item">
                             <Link style={{"color":"white", "fontSize":"20px"}} to="/signup">register</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
    Menu
);