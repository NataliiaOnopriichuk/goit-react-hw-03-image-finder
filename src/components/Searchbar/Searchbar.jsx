import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onChangeInputValue = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
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
