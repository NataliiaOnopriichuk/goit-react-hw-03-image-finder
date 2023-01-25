import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ dataImages, openModal }) => {
  return dataImages.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li
      key={id}
      className={s.ImageGalleryItem}
      onClick={() => {
        openModal(largeImageURL);
      }}
    >
      <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  ));
};

ImageGalleryItem.protoTypes = {
  dataImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
