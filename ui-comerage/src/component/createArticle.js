import React from 'react'
import { Field, reduxForm } from 'redux-form';

const renderTextArea = ({ input, meta: { touched, error, warning } }) => (
    <div>
        <label>Ajouter un nouvelle article</label>
        <div>
            <textarea {...input} placeholder="Content" rows="10" cols="40" />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);
const displayCategories = (categories) => {
    if (categories) {
        return categories.map((category) => {
            return (
                <div style={{ display: 'flex' }} key={category.id}>
                    <label htmlFor={category.name}>{category.name}</label>
                    <div>
                        <Field name={category.name} id={category.id} component="input" type="checkbox" />
                    </div>
                </div>
            )
        })
    }

}
const CreateArticle = props => {
    const { handleSubmit, submitting } = props
    return (
        <div className="article-created">
            <form onSubmit={handleSubmit}>
                <Field
                    name="message"
                    type="textarea"
                    component={renderTextArea}
                    label="Votre article"
                />
                <div className="category-select">
                    {displayCategories(props.categories)}
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

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
})(CreateArticle)
