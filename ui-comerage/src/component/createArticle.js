import React from 'react'
import { Field, reduxForm } from 'redux-form';

const renderTextArea = ({ input, messageText, labelText, meta: { touched, error, warning } }) => (
    <div>
        <label>{labelText}</label>
        <div>
            <textarea {...input} value={messageText} placeholder="Content" rows="10" cols="40" maxLength="200">{messageText}</textarea>
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
    const { handleSubmit, submitting, message, submitText, label, update, handleChange } = props
    return (
        <div className="article-created">
            <form onSubmit={handleSubmit}>
                <Field
                    name="message"
                    type="textarea"
                    component={renderTextArea}
                    label="Votre article"
                    messageText={message}
                    labelText={label}
                    onChange={handleChange}
                />
                {!update ? <div className="category-select">
                    {displayCategories(props.categories)}
                </div> : ''}

                <div>
                    <button type="submit" className="submit-message" disabled={submitting}>
                        {submitText}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
})(CreateArticle)
