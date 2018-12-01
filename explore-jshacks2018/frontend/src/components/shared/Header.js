import React, { Component } from 'react';

class Header extends Component {
    _getSuffix() {
        if (!this.props.suffix) return '';
        return `| ${this.props.suffix}`;
    }

    render() {
        return (
            <div className="Header">
                <h2 style={{ width: '100%' }}>
                    <span style={{ float: 'left' }}>Exploore{this._getSuffix()}</span>
                    <span style={{ float: 'right' }}>Get recommended events</span>
                </h2>
            </div>
        );
    }
}

export default Header;
