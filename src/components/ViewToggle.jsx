import React from 'react';
import '../styles/viewToggle.css';

const ViewToggle = ({ currentView, onViewChange }) => {
    return (
        <div className="view-toggle-container">
            <div className="view-toggle">
                <button
                    className={`toggle-btn ${currentView === 'stack' ? 'active' : ''}`}
                    onClick={() => onViewChange('stack')}
                >
                    STACK
                </button>
                <span className="separator">/</span>
                <button
                    className={`toggle-btn ${currentView === 'grid' ? 'active' : ''}`}
                    onClick={() => onViewChange('grid')}
                >
                    GRID
                </button>
                <span className="separator">/</span>
                <button
                    className={`toggle-btn ${currentView === 'marquee' ? 'active' : ''}`}
                    onClick={() => onViewChange('marquee')}
                >
                    MARQUEE
                </button>
            </div>

            <div className="archive-link">
                <a href="#archive">ARCHIVE (08)</a>
            </div>
        </div>
    );
};

export default ViewToggle;
