import React, { Component } from 'react';
import { fetchSingleArticle } from '../actions/article.action';
import { connect } from 'react-redux';

class ArticleSingle extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            singlePost: []
        };
    }

    componentDidMount() {
        this.props.getSingleArtcile(this.props.routeParams.id).then((response) => {
            console.log(response.article)
              this.setState({singlePost: response.article});
        })
    }

    render() {
        let post = this.state.singlePost;
        return (
            <div>
                <article className="news">
                        <header>
                            <h2 className="article-title">{post.title}</h2>
                        </header>
                        <p>Written by <span className="article-author">{post.author}</span></p>
                        <img alt="" src={`http://localhost:3005/${post.urlToImage}`}/>
                        <span className="article-published-date">{post.publishedAt}</span>
                        <p className="article-description">{post.description}</p>
                </article>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            currentArticle: state.currentArticle
        }
    },
    (dispatch) => {
        return {
            getSingleArtcile: (id) => {
                return dispatch(fetchSingleArticle(id));
            }
        }
})(ArticleSingle);