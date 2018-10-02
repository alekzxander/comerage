import React from 'react'
import { getArticles, getComments } from '../action/index';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount = () => {

        this.props.getArticles();

    }
    displayArticles = (articles) => {
        if (articles) {
            // this.props.getComments(33)
            return articles.map((article) => {
                return (<div key={article.id} className="article">                    <p>{article.body}</p>
                    <button disabled className="category-article">Cuisine</button>
                    <h6 className="date-article">{article.date}</h6>
                    <h6 className="user-article">Posted by {article.userName}</h6>
                    <div className="separator"></div>
                    {/* <div><h3>{this.props.comments}</h3></div> */}
                </div>)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="articles-view">
                            {this.displayArticles(this.props.articles)}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="filter">

                        </div>
                    </div>
                </div>

            </div >);
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles,
        comments: state.comments
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticles,
        getComments
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Articles);