import React from 'react'

const Header = (props) => {
    return (
        <div>
            <div className="navbar">
                <button>
                    Indentification
                </button>
            </div>
            <div className="bandeau">
                <h2 className="text-center">Bienvenue sur Comérage</h2>
                <h4 className="text-center">Le premier site de ladit lafait de la réunion</h4>
            </div>
        </div>
    )
};

export default Header;