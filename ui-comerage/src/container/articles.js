import React from 'react'
import { getArticles, selectArticle } from '../action/index';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from 'react-router-dom';
import CreateArticle from '../component/createArticle';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
        this.onToggle = this.onToggle.bind(this);
    }
    componentWillMount = () => {
        this.props.getArticles();
    }
    displayArticles = (articles) => {
        if (articles && Array.isArray(articles)) {
            return articles.map((article) => {
                return (<div key={article.id} className="article">
                    <Link to="/article" onClick={() => this.props.selectArticle(article.id)}><p>{article.body}</p></Link>
                    {article.categories.map((cat) => {
                        return <button key={cat.id} disabled className="category-article">{cat.name}</button>
                    })
                    }
                    <h6 className="date-article">{article.date}</h6>
                    <h6 className="user-article">Posted by {article.userName}</h6>
                    <div className="separator"></div>
                </div >)
            })
        }
    }
    submitArticle(event) {
        const cuisine = event.target.Cuisine.value;
        const cinema = event.target.Cinema.value;
        const sport = event.target.Sport.value;
        const culture = event.target.Culture.value;
        console.log(cuisine, cinema, sport, culture)
        event.preventDefault();
        this.setState({
            toggle: !this.state.toggle
        })

    }
    onToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="articles-view">
                            {/* {this.state.toggle && this.props.user.token ? < CreateArticle /> : ''}
                            {this.displayArticles(this.props.articles)} */}
                            < CreateArticle handleSubmit={(e) => this.submitArticle(e)} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        {this.props.user.token ?
                            <div className="create-article" onClick={() => this.onToggle()} style={{ background: '#2D71C9', cursor: 'pointer' }}>
                                <h3>Creer un article</h3>
                            </div>
                            : <div className="create-article" style={{ background: '#A7A6A6' }}>
                                <h3>Creer un article</h3>
                            </div>}

                        <div className="filter">
                            <label className="container-check">Cuisine
                        <input type="checkbox" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="container-check">Cinema
                        <input type="checkbox" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="container-check">Musique
                        <input type="checkbox" />
                                <span className="checkmark"></span>
                            </label>

                            <label className="container-check">Sport
                        <input type="checkbox" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>

            </div >);
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles,
        comments: state.comments,
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticles,
        selectArticle
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles));