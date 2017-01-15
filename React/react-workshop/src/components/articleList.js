import React, { Component } from 'react';
import Article from './article';
import { fetchArticles } from '../actions';
import { connect } from 'react-redux';


class ArticleList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        this.props.getArtciles().then((response) => {
             this.setState({posts: response.articles});
        })     
    }

    render() {
        return (
            <div>
                {this.state.posts.map((post, i) =>
                        <Article key={post._id} post={post} />
                )}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            articles: state.articles
        }
    },
    (dispatch) => {
        return {
            getArtciles: () => {return dispatch(fetchArticles())}
        }
})(ArticleList);