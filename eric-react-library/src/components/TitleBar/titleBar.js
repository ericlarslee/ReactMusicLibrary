import React from 'react';
import './titleBar.css';

function TitleBar(props) {
    return (
        <div className="row row-spacer">
            <div className="col-md-12" style={{padding: 0}}>
                <div>
                    <h1>React Music Library</h1>
                </div>
            </div>
        </div>
    );
}

export default TitleBar;