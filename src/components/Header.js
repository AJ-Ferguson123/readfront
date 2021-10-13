import { useEffect } from "react";
import { NavLink,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logUserOut, toggleLogin, getPosts, getSubs } from "../action/index";
import axios from "axios";



function Header(props) {
    const history = useHistory()
    //do not log user out if  site is reloaded
    //log users back in with information from local storage
    useEffect(() => {
        if(localStorage.user_id)
        props.toggleLogin()
    }, [])
    useEffect(() => {
        async function fetchData() {
            try{
                const tempPosts = await axios.get('/api/post')
                props.getPosts(tempPosts.data)
                const tempSubs = await axios.get('r')
                props.getSubs(tempSubs.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const logOutHandler = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        props.logUserOut()
    }

    return (
        <div className="header">
            <NavLink to="/" className="nav">
                <img />
                <div>ReadIt</div>
                </NavLink>
            <div className="loginNav">
                {
                    (props.loggedIn) ?
                    <div onClick={logOutHandler}>Log Out</div> : null
                }
                <NavLink to="/login" className="loginNav">
                    <div className={props.loggedIn ? "login" : "not-login"}>Log In</div>
                </NavLink>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, {logUserOut, toggleLogin, getPosts, getSubs})(Header)