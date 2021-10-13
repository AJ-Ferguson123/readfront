import { useState } from "react";
import { connect } from "react-redux";
import { axios } from "../utils/axios";
import {searchPost, getPosts} from "../action/index"

function Search(props) {
    const [searchString, setSearchString] = useState('')
    const changeHandler = (e) => {
        setSearchString(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault()

        axios.get('/api/post')
            .then(res => {
                props.getPosts(res.data)
                props.searchPost(searchString)
            })
            .catch(err => console.log(err))
    }
    const clearSearch = (e) => {
        e.preventDefault()
        setSearchString('')
        axios.get('/api/post')
        .then(res => { props.getPosts(res.data) }).catch(err => console.log(err))
    }

    return (
        <div className="search-container">
            <form>
                <input
                type="text"
                name="searchString"
                value={searchString}
                placeholder="Search Posts"
                onChange={changeHandler}
                />
                <button onClick={submitHandler} className="search-button">
                    <i className="fa fa-search"></i>
                </button>
                <button onClick={clearSearch} className="search-button">
                    <i className="fa fa-window-close"></i>
                </button>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        Posts: state.Posts
    }
}

export default connect(mapStateToProps, {searchPost, getPosts})(Search)