"use strict";

import React from 'react';

export default class Popover extends React.Component {
  static defaultProps = {
    toggleButton: <button className="btn btn-lrg btn-success">Toggle Menu</button>,
    position: 'bottom',
    topOffset: 10,
    leftOffset: 0,
    horizontalJustify: 'left'
  }

  constructor(props) {
    super(props);

    this.state = {
      topOffset: 0,
      leftOffset: 0,
      isOpen: false
    };
  }

  componentDidMount() {
    this.calculateHeights();

    document.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.handleClick(true, ev);
    });

    React.findDOMNode(this.refs.popover).addEventListener('click', (ev) => {
     if(this.props.stopPropagation === false) return
     ev.stopPropagation();
    });

    React.findDOMNode(this.refs.toggleButton).addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.handleClick(this.props.isOpen, ev);
    });
  }

  calculateHeights() {
    this.buttonHeight = React.findDOMNode(this.refs.toggleButton).offsetHeight;
    this.buttonWidth = React.findDOMNode(this.refs.toggleButton).offsetWidth;

    this.popoverHeight = React.findDOMNode(this.refs.popover).offsetHeight;
    this.popoverWidth = React.findDOMNode(this.refs.popover).offsetWidth;

    this.setState({
      topOffset: this.calculateTopOffset(),
      leftOffset: this.calculateLeftOffset()
    });
  }

  handleClick(value, ev) {
    this.props.handleClick(value, ev);
  }

  calculateTopOffset() {
    let offset = '0px';

    switch(this.props.position) {
      case 'top':
        offset = `-${this.popoverHeight + this.props.topOffset}px`;
        break;
      case 'bottom':
        offset = `${this.buttonHeight + this.props.topOffset}px`;
        break;
      case 'left':
        offset = `${this.props.topOffset}px`;
        break;
      case 'right':
        offset = `${this.props.topOffset}px`;
        break;
      default:
        offset = 0;
    }

    return offset;
  }

  calculateLeftOffset() {
    let offset = '0px';

    switch(this.props.position) {
      case 'top':
        offset = `${this.props.leftOffset}px`;
        break;
      case 'bottom':
        offset = `${this.props.leftOffset}px`;
        break;
      case 'left':
        offset = `-${this.popoverWidth + this.props.leftOffset}px`;
        break;
      case 'right':
        offset = `${this.buttonWidth + this.props.leftOffset}px`;
        break;
      default:
        offset = 0;
    }

    return offset;
  }

  render() {
    let toggleButton = React.cloneElement(this.props.toggleButton, {
      ref: 'toggleButton'
    });

    let popoverClass = `popover-menu ${this.props.className || ''}`;
    let contentClass = `popover-content ${this.props.position} ${this.props.isOpen ? 'show' : ''}`
    let contentStyles = { top: this.state.topOffset }
    contentStyles[this.props.horizontalJustify] = this.state.leftOffset;

    return (
      <div className={popoverClass}>
        {toggleButton}
        <section className={contentClass} style={contentStyles} ref="popover">
          {this.props.children}
        </section>
      </div>
    )
  }
}
