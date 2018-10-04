import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getArticles, addComment } from '../action/index';

class SelectArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
        this.submitComment = this.submitComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    displayComment() {
        if (this.props.article.comments) {
            return this.props.article.comments.map((comment) => {
                return <div key={comment.id} className="comments">
                    <p>{comment.body}</p>
                    <h6 className="date-article">{comment.publication_date}</h6>

                </div>
            });
        }
    }
    handleChange(e) {
        if (e) {
            this.setState({
                message: e.target.value
            })
        }
    }
    submitComment() {
        if (this.state.message.length > 4) {
            this.props.addComment(this.props.user.token, this.state.message, this.props.article.id);
            this.setState({
                message: ''
            })
        }

    }

    render() {
        const { article } = this.props;
        return (
            <div>
                <div className="article-seleted">
                    <p>{article.view}</p>
                    <h6 className="date-article">{article.date}</h6>
                    <h6 className="user-article">Posted by {article.user}</h6>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                        {this.displayComment()}
                        {this.props.user.token ?
                            <div className="comments">
                                <div>
                                    <h5>Ajouter un commentaire</h5>
                                    <textarea name="comment" maxLength="200" id="" value={this.state.message} onChange={this.handleChange}>
                                        {this.state.message}
                                    </textarea>
                                    <p className="caract">{this.state.message.length}/200</p>
                                    <button onClick={this.submitComment} className="submit-message">Envoyer mon commentaire</button>
                                </div>
                                {/* < Comment handleComment={(e) => this.handleChange(e)} submitComment={this.submitComment} caract={this.state.message.length} /> */}
                            </div> : ''}

                    </div>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticles,
        addComment
    }, dispatch)
}
function mapStateToProps(state) {
    return {
        article: state.articles,
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectArticle);