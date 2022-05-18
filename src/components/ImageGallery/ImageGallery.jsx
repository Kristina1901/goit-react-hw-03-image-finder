import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from 'components/ImageGallery/ImageGallery.module.css';
import Loader from 'components/Loader/Loader';
export default function ImageGallery({ image, error, status, onClick }) {
  if (status === 'idle') {
    return;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return error.message;
  }
  if (status === 'resolved') {
    function ImageList(arr) {
      return (
        <ul className={s.list}>
          {arr.map(
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
    return ImageList(image);
  }
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
