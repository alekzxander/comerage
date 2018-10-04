import React from 'react'
import { getArticles, selectArticle, getCategories, createArticle, filterCategories } from '../action/index';
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
        this.props.getCategories();
    }
    displayArticles = (articles) => {
        if (articles && Array.isArray(articles)) {
            return articles.map((article) => {
                return (<div key={article.id} className="article">
                    <Link to="/article" onClick={() => this.props.selectArticle(article.id)}><p>{article.body}</p></Link>
                    {article.categories.map((cat, id) => {
                        return <button key={id} disabled className="category-article">{cat}</button>
                    })

                    }
                    <h6 className="date-article">{article.date}</h6>
                    <h6 className="user-article">Posted by {article.userName}</h6>
                    <div className="separator"></div>
                </div >)
            })
        }
    }
    displayCategories = (categories) => {
        return categories.map((category) => {
            return (
                <label key={category.id} className="container-check">{category.name}
                    <input type="checkbox" name={category.name} onChange={this.props.filterCategories} />
                    <span className="checkmark"></span>
                </label>
            )
        })
    }
    submitArticle(event) {
        event.preventDefault();
        const cinema = event.target.Cinema;
        const sport = event.target.Sport;
        const musique = event.target.Musique;
        const culture = event.target.Culture;
        const politique = event.target.Politique;
        const categories = [cinema, sport, musique, culture, politique]
        const getCategories = categories.filter((category) => {
            if (category.value) {
                return category.id
            }
            return false;
        })
        const getIdCategories = getCategories.map((cat) => {
            return cat.id
        })
        this.props.createArticle(this.props.user.token, event.target.message.value, getIdCategories)
        this.setState({
            toggle: !this.state.toggle
        })
        return false
    }
    onToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    render() {
        const { user, articles, categories } = this.props;
        const { toggle } = this.state;
        console.log(articles)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="articles-view">
                            {toggle && user.token ? < CreateArticle handleSubmit={(e) => this.submitArticle(e)} categories={categories} /> : ''}
                            {this.displayArticles(articles)}
                        </div>
                    </div>
                    <div className="col-md-3">
                        {user.token ?
                            <div className="create-article" onClick={() => this.onToggle()} style={{ background: '#2D71C9', cursor: 'pointer' }}>
                                <h3>Creer un article</h3>
                            </div>
                            : <div className="create-article" style={{ background: '#A7A6A6' }}>
                                <h3>Creer un article</h3>
                            </div>}

                        <div className="filter">
                            {this.displayCategories(categories)}
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
        user: state.user,
        categories: state.categories
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticles,
        selectArticle,
        getCategories,
        createArticle,
        filterCategories
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles));