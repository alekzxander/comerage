import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";


class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: ''
        }
    }
    render() {

        const renderTextArea = ({ input, meta: { touched, error, warning } }) => (
            <div>
                <label>Content</label>
                <div>
                    <textarea {...input} placeholder="Content" rows="10" cols="40" />
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        );
        const { handleSubmit, submitting } = this.props
        return (
            <div className="article-created">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Field
                        name="message"
                        type="textarea"
                        component={renderTextArea}
                        label="Votre article"
                    />
                    <div className="category-select">
                        <label htmlFor="Cuisine">Cuisine</label>
                        <div>
                            <Field name="Cuisine" id="Cuisine" component="input" type="checkbox" />
                        </div>
                        <label htmlFor="Cinema">Cinema</label>
                        <div>
                            <Field name="Cinema" id="Cinema" component="input" type="checkbox" />
                        </div>
                        <label htmlFor="Sport">Sport</label>
                        <div>
                            <Field name="Sport" id="Sport" component="input" type="checkbox" />
                        </div>
                        <label htmlFor="Culture">Culture</label>
                        <div>
                            <Field name="Culture" id="Culture" component="input" type="checkbox" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="submit-message" disabled={submitting}>
                            Poster cette article
          </button>
                    </div>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}
export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
}); connect(mapStateToProps)(CreateArticle)