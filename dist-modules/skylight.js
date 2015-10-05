'use strict';

var React = require('react');
var styles = require('./styles');
var extend = require('util')._extend;

var SkyLight = React.createClass({
    displayName: 'SkyLight',

    propTypes: {
        title: React.PropTypes.string,
        showOverlay: React.PropTypes.bool,
        beforeOpen: React.PropTypes.func,
        afterOpen: React.PropTypes.func,
        beforeClose: React.PropTypes.func,
        afterClose: React.PropTypes.func,
        overlayStyles: React.PropTypes.object,
        dialogStyles: React.PropTypes.object,
        closeButtonStyle: React.PropTypes.object
    },
    getDefaultProps: function getDefaultProps() {
        return {
            title: '',
            showOverlay: true,
            overlayStyles: styles.overlayStyles,
            dialogStyles: styles.dialogStyles,
            closeButtonStyle: styles.closeButtonStyle
        };
    },
    getInitialState: function getInitialState() {
        return {
            isVisible: false
        };
    },
    show: function show() {
        this.setState({ isVisible: true });
    },
    hide: function hide() {
        this.setState({ isVisible: false });
    },
    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        if (nextState.isVisible && !this.state.isVisible && this.props.beforeOpen) {
            this.props.beforeOpen();
        }

        if (!nextState.isVisible && this.state.isVisible && this.props.beforeClose) {
            this.props.beforeClose();
        }
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        if (!prevState.isVisible && this.state.isVisible && this.props.afterOpen) {
            this.props.afterOpen();
        }

        if (prevState.isVisible && !this.state.isVisible && this.props.afterClose) {
            this.props.afterClose();
        }
    },
    render: function render() {

        var overlay;

        var dialogStyles = extend(styles.dialogStyles, this.props.dialogStyles);
        var overlayStyles = extend(styles.overlayStyles, this.props.overlayStyles);
        var closeButtonStyle = extend(styles.closeButtonStyle, this.props.closeButtonStyle);

        if (this.state.isVisible) {
            overlayStyles.display = 'block';
            dialogStyles.display = 'block';
        } else {
            overlayStyles.display = 'none';
            dialogStyles.display = 'none';
        }

        if (this.props.showOverlay) {
            overlay = React.createElement('div', { style: overlayStyles });
        }

        return React.createElement(
            'section',
            { className: 'skylight-wrapper' },
            overlay,
            React.createElement(
                'div',
                { style: dialogStyles },
                React.createElement(
                    'a',
                    { role: 'button', style: closeButtonStyle, onClick: this.hide },
                    '×'
                ),
                React.createElement(
                    'h2',
                    null,
                    this.props.title
                ),
                this.props.children
            )
        );
    }
});

module.exports = SkyLight;