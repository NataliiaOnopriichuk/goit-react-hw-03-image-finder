import s from './Modal.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.closeModalOnEscape);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closeModalOnEscape);
  };

  closeModalOnEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModalOnBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.closeModalOnBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
