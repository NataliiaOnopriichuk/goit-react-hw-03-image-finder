import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getSearchedNewsApi } from 'utils/api.js';

export class ImageGallery extends Component {
  state = {
    query: '',
    dataArray: [],
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      try {
        const data = await getSearchedNewsApi(this.props.query);
        this.setState({ dataArray: data.hits });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }

  render() {
    return (
      <ul className={s.ImageGallery}>
        <ImageGalleryItem dataArray={this.state.dataArray} />
      </ul>
    );
  }
}

ImageGallery.protoTypes = {
  query: PropTypes.string.isRequired,
};
