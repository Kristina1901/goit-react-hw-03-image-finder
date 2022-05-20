import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from 'components/ImageGallery/ImageGallery.module.css';
export default function ImageGallery({ image, onClick }) {
  return (
    <ul className={s.list}>
      {image.map(
        ({
          id,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
          largeImageURL,
        }) => (
          <li key={id} className={s.item}>
            <ImageGalleryItem
              id={id}
              webformatURL={webformatURL}
              tags={tags}
              likes={likes}
              views={views}
              comments={comments}
              downloads={downloads}
              largeImageURL={largeImageURL}
              onClick={onClick}
            />
          </li>
        )
      )}
    </ul>
  );
}

ImageGallery.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      downloads: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
