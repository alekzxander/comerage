import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getArticles, addComment, deleteArticle, updateArticle } from '../action/index';
import { Redirect } from 'react-router-dom';
import CreateArticle from '../component/createArticle';

class SelectArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            toggle: false
        }
        this.onToggle = this.onToggle.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.messageChange = this.messageChange.bind(this);
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
    submitComment(e) {
        e.preventDefault()
        if (this.state.message.length > 4) {
            this.props.addComment(this.props.user.token, this.state.message, this.props.article.id);
            this.setState({
                message: ''
            })
        }
    }
    messageChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    onToggle() {
        this.setState({
            toggle: !this.state.toggle,
            messsage: this.props.article.view
        })
    }
    handleDelete() {
        console.log('delete on view')
        const { article, user } = this.props;
        this.props.deleteArticle(article.id, user.token);
        return <Redirect to="/" />
    }
    updateArticle(e) {
        const { article, user } = this.props;
        e.preventDefault();
        this.props.updateArticle(article.id, user.token, e.target.message.value);
        this.setState({
            toggle: false,
            message: ''
        })

    }
    render() {
        const { article, user } = this.props;
        const { toggle, message } = this.state;
        return (
            <div>
                {toggle ? < CreateArticle handleChange={this.messageChange} message={message} update={true} handleSubmit={(e) => this.updateArticle(e)} submitText={'Modifier cette article'} label={'Modifier un article'} /> : ''}
                <div className="article-seleted">
                    <p>{article.view}</p>
                    <h6 className="date-article">{article.date}</h6>
                    <h6 className="user-article">Posted by {article.user}</h6>
                    {user.id === article.user_id ? <div> <button className="delete-article" onClick={this.handleDelete.bind(this)}>Supprimer</button>
                        <button className="update-article" onClick={this.onToggle}>Modifier</button></div> : ''}
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
        addComment,
        deleteArticle,
        updateArticle
    }, dispatch)
}
function mapStateToProps(state) {
    return {
        article: state.articles,
        user: state.user,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectArticle);