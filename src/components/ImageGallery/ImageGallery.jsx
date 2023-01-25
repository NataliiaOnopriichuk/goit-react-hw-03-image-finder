import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getSearchedNewsApi } from 'utils/api.js';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    query: '',
    dataArray: [],
    page: 1,
    error: null,
    isLoading: false,
  };

  static getDerivedStateFromProps(newProps, state) {
    if (newProps.query !== state.query) {
      return { page: 1, query: newProps.query };
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ isLoading: true });
      try {
        const data = await getSearchedNewsApi(
          this.props.query,
          this.state.page
        );
        this.setState({ dataArray: data.hits });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ isLoading: true });
      try {
        const data = await getSearchedNewsApi(
          this.props.query,
          this.state.page
        );
        this.setState(prev => ({
          dataArray: [...prev.dataArray, ...data.hits],
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  changePageOnClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { dataArray, isLoading, error } = this.state;
    if (error) return <p>{error}</p>;
    return (
      <ul className={s.ImageGallery}>
        <ImageGalleryItem dataArray={dataArray} />
        {isLoading && <Loader />}
        {dataArray.length > 0 && <Button onClick={this.changePageOnClick} />}
      </ul>
    );
  }
}

ImageGallery.protoTypes = {
  query: PropTypes.string.isRequired,
};
