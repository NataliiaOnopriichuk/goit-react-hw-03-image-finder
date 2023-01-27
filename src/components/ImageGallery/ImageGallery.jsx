import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getSearchedNewsApi } from 'service/api.js';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    query: '',
    dataImages: [],
    page: 1,
    error: null,
    isLoading: false,
  };

  static getDerivedStateFromProps(newProps, state) {
    if (newProps.query !== state.query) {
      return { page: 1, query: newProps.query, dataImages: [] };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      (prevState.page !== this.state.page && this.state.page !== 1)
    ) {
      this.getSearchedImages();
    }
  }

  getSearchedImages = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await getSearchedNewsApi(this.props.query, this.state.page);
      this.setState(prev => ({
        dataImages: [...prev.dataImages, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePageOnClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { dataImages, isLoading, error } = this.state;
    if (error) return <p>Download error {error}</p>;
    return (
      <>
        <ul className={s.ImageGallery}>
          {dataImages.map(el => (
            <ImageGalleryItem
              key={el.id}
              {...el}
              openModal={this.props.openModal}
            />
          ))}
        </ul>
        <div style={{ textAlign: 'center' }}>
          {!isLoading && dataImages.length >= 12 && (
            <Button onClick={this.changePageOnClick} />
          )}
          {isLoading && <Loader />}
        </div>
      </>
    );
  }
}

ImageGallery.protoTypes = {
  query: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
