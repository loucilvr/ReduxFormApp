import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import styles from '../../style/Stylesheet';

class PostsIndex extends Component {
    //renders twice, the first time w/o posts
    // then rerenders with the populated props of posts
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        //lodash allows you to map over object
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item"
                key={post.id}>
                    { post.title }
                </li>
            );
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts/new" className="btn btn-primary"
                    style={styles.margin}>
                        New Post
                    </Link>
                </div>
                <h3 style={styles.margin}>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);