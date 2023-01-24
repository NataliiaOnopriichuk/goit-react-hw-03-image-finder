import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import s from './App.module.css';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    query: '',
  };

  changeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.changeQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
