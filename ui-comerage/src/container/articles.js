import React from 'react'
import { getArticles, selectArticle, getCategories, createArticle, filterCategories } from '../action/index';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from 'react-router-dom';
import CreateArticle from '../component/createArticle';
import Moment from 'react-moment';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            filter: []
        }
        this.onToggle = this.onToggle.bind(this);
        this.filter = this.filter.bind(this)
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
                    {article.categories.map((cat) => {
                        return <button key={cat.category.id} disabled className="category-article">{cat.category.name}</button>
                    })
                    }
                    <h6 className="date-article">< Moment format="DD/MM/YYYY" date={article.data} /></h6>
                    <h6 className="user-article">Posted by {article.user.nickname}</h6>
                    <div className="separator"></div>
                </div >)

            })
        }

    }
    displayCategories = (categories) => {
        return categories.map((category) => {
            return (
                <label key={category.id} className="container-check">{category.name}
                    <input type="checkbox" id={category.id} name={category.name} onChange={this.filter} />
                    <span className="checkmark"></span>
                </label>
            )
        })
    }
    filter = (e) => {
        if (e.target.checked) {
            const category = e.target.id;
            const join = this.state.filter.concat(category)
            this.setState({
                filter: join
            })
        } else {
            this.setState({
                filter: []
            })
        }
    }
    handleFilter = () => {
        this.props.filterCategories(this.state.filter);
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="articles-view">
                            {toggle && user.token ? < CreateArticle update={false} handleSubmit={(e) => this.submitArticle(e)} categories={categories} submitText={'Poster cette article'} label={'Creer un article'} /> : ''}
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
                            <button className="create-article" onClick={() => this.handleFilter()}>Valider</button>
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