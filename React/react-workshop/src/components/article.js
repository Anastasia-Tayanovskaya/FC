import React, { Component } from 'react';
import { Link } from 'react-router';

class Article extends Component {
    render() {
        let imageUrl = this.props.post.urlToImage.includes('http') ? this.props.post.urlToImage : `http://localhost:3005/${this.props.post.urlToImage}`;
        return (
            <article className="news">
                <Link className="article-link" to={`/articles/${this.props.post._id}`}>
                    <header>
                        <h2 className="article-title">{this.props.post.title}</h2>
                    </header>
                    <p>Written by <span className="article-author">{this.props.post.author}</span></p>
                    <img alt="" src={imageUrl}/>
                    <span className="article-published-date">{this.props.post.publishedAt}</span>
                    <p className="article-description">{this.props.post.description}</p>
                </Link>
		    </article>
        );
    }
}

export default Article;