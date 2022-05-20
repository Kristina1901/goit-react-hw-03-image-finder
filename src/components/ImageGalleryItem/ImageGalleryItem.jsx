import PropTypes from 'prop-types';
import s from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
export default function ImageGalleryItem({
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
  largeImageURL,
  onClick,
}) {
  return (
    <div className={s.photo}>
      <img
        src={webformatURL}
        alt={tags}
        data-large_img={largeImageURL}
        onClick={onClick}
        className={s.img}
      />
      <div className={s.info}>
        <p className={s.infoItem}>
          <b>Likes</b>
          <span className={s.static}>{likes}</span>
        </p>
        <p className={s.infoItem}>
          <b>Views</b>
          <span className={s.static}>{views}</span>
        </p>
        <p className={s.infoItem}>
          <b>Comments</b>
          <span className={s.static}>{comments}</span>
        </p>
        <p className={s.infoItem}>
          <b>Downloads</b>
          <span className={s.static}>{downloads}</span>
        </p>
      </div>
    </div>
  );
}
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  downloads: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
