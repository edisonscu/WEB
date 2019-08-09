import React from 'react';

interface ButtonMainProps {
    text: string;
    onClick: () => void;
}

export default ({ text, onClick }: ButtonMainProps): JSX.Element => {
    return (
        <div className="button button-main" onClick={onClick}>
            <div className="spin"></div>
            <a href="#">{text}</a>
        </div>
    );
}