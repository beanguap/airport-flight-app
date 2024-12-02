import React from 'react';
import './toolbar.css';

const ToolbarItem = ({ title }) => (
    <div className="toolbar-item">
        <h2 className="h2">{title}</h2>
    </div>
);

const Toolbar = () => {
    const scrollLeft = () => {
        const container = document.querySelector('.toolbar-container');
        container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const container = document.querySelector('.toolbar-container');
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
    };

    return (
        <div className="toolbar-container">
            <button className="toolbar-arrow left" onClick={scrollLeft}>&#9664;</button>
            <ToolbarItem title="Item 1" />
            <ToolbarItem title="Item 2" />
            <ToolbarItem title="Item 3" />
            <button className="toolbar-arrow right" onClick={scrollRight}>&#9654;</button>
        </div>
    );
};

export default Toolbar;