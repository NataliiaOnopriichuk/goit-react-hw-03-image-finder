import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onChangeInputValue = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
  };

  resetInputValue = () => {
    this.setState({ inputValue: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.resetInputValue();
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span>
              <BsSearch className={s.SearchFormButtonLabel} />
            </span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.value}
            placeholder="Search images and photos"
            onChange={this.onChangeInputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
