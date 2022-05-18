import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import ClipLoader from 'react-spinners/ClipLoader';
import 'react-image-lightbox/style.css';
export default function Modal({
  image,
  photoIndex,
  onClose,
  nextImage,
  prevImage,
}) {
  return (
    <Lightbox
      mainSrc={image[photoIndex].largeImageURL}
      nextSrc={image[(photoIndex + 1) % image.length].largeImageURL}
      prevSrc={
        image[(photoIndex + image.length - 1) % image.length].largeImageURL
      }
      onCloseRequest={onClose}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
      onMovePrevRequest={prevImage}
      onMoveNextRequest={nextImage}
      loader={
        <ClipLoader type="Circles" color="#00BFFF" height={100} width={100} />
      }
    />
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.array,
  photoIndex: PropTypes.number.isRequired,
  nextImage: PropTypes.func.isRequired,
  prevImage: PropTypes.func.isRequired,
};
