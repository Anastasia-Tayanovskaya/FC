import React, { Component } from 'react';

export default class ArticleSingle extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            singlePost: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3005/api/articles/${this.props.routeParams.id}`).then(r => r.json())
            .then((data) => {
                this.setState({singlePost: data});
            })
            .catch((err) => {
                console.log(err);
            });
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