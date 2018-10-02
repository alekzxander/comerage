import React from 'react'
import { getArticles } from '../action/index';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount = () => {
        this.props.getArticles();
    }

    render() {
        console.log(this.props.articles)
        return (
            <div className="container">
                <div className="article-view">
                    <h1>Coucou article</h1>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticles
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Articles);