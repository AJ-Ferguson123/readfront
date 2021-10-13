import { useEffect } from "react";
import axios from '../utils/axios'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { getPosts, getSubs, upVotePost, downVotePost, deletePost } from "../action/index";
import Sidebar from '../components/Sidebar'
import { checkedLoggedIn } from "../utils/checkLoggedIn";
import { useHistory } from "react-router-dom";
import Search from './Search'

const styleColor = {
    color: "007bdf",
    cursor: "pointer"
}

function MainPage(props) {
    const history = useHistory()
    const postLinkHandler = (post_id) => {
        history.push(`/post/${post_id}`)
    }
    const subLinkHandler = (name) => {
        history.push(`/r/${name}`)
    }
    const upVoteHandler = (post_id) => {
        if(checkedLoggedIn()) {
            props.upVotePost(post_id)
            axios.put(`/api/post/upvote/${post_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        else
        history.push(`/login`)
    }
    const downVoteHandler = (post_id, post_like) => {
        if(checkedLoggedIn()) {
            if (post_likes <= 0)
            return
            props.downVotePost(post_id)
            axios.put(`/api/post/${post_id}`)
        }
        else
        history.push(`/login`)
    }
    const deletePostHandler = (post_id) => {
        axiosWithAuth().delete(`/api/post/${post_id}`)
        .then(res => {
            props.deletePost(post_id)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="main-container">
            <div className="posts-container">
                {
                    props.post.map(post => {
                        return <div className="post">
                            <div className="like-container">
                                <div className="upvote" onClick={() => {upVoteHandler(post.id)}}>
                                    <i className="fa fa-angle-up"></i>
                                </div>
                                <div className="downvote" onClick={() => {downVoteHandler(post.id, post.likes)}}>
                                    <i className="fa fa-angle-down"></i>
                                </div>
                            </div>
                            <div>
                                <div onClick={() => postLinkHandler(post.id)} style={{ color: "#0000FF", cursor: "pointer"}}>
                                    {post.title}
                                </div>
                                <div className="post-info">Posted By
                                <span>{post.username}</span>on subreadit:<span onClick={() => subLinkHandler(post.subreadit)}
                                    style={{styleColor}}>/r/{post.subreadit}</span>
                                </div>
                                <div className="post-info">Likes: {post.likes}
                                    {localStorage.user_id == post.user_id ?
                                    <span onClick={() => deletePostHandler(post.id)} style={{color: "007bfd", cursor: "pointer"}}>
                                        &nsbp:&nsbp:delete
                                    </span> : null
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="side">
                <Search />
                <Sidebar />
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        posts: state.post,
        subreadit: state.subreadit,
        userId: state.user.id
    }
}

export default connect(mapStateToProps, {getPosts, getSubs, upVotePost, downVotePost, deletePost})(MainPage)

