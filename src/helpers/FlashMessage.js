import React from 'react';

const FlashMessage = ({ message, type, onClose }) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
            {message}
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
    );
};

export default FlashMessage;
