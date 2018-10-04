import React from 'react';

const Comment = (props) => {
    return (
        <div>
            <h5>Ajouter un commentaire</h5>
            <textarea name="comment" maxLength="200" id="" onKeyDown={props.handleComment}>

            </textarea>
            <p className="caract">{props.caract}/200</p>
            <button onClick={props.submitComment} className="submit-message">Envoyer mon commentaire</button>
        </div>
    )
}
export default Comment;