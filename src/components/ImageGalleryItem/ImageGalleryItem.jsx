import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ dataArray }) => {
  return dataArray.map(({ id, webformatURL, tags }) => (
    <li key={id} className={s.ImageGalleryItem}>
      <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  ));
};

ImageGalleryItem.protoTypes = {
  dataArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
};
