import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';
import Container from 'components/Container/Container';
import Section from 'components/Section/Section';
import { animateScroll as scroll } from 'react-scroll';
import Modal from 'components/Modal/Modal';
export default class App extends Component {
  state = {
    imageName: '',
    image: [],
    error: null,
    status: 'idle',
    page: 1,
    total: null,
    value: false,
    isModalOpen: false,
    modalImageIndex: null,
  };
  handleSearchFormSubmit = imageName => {
    this.setState({ imageName });
  };
  switchModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  onGalleryListClick = event => {
    if (event.target.nodeName === 'IMG') {
      const index = this.state.image.findIndex(
        el => el.webformatURL === event.target.src
      );

      this.setState({
        modalImageIndex: index,
      });
    }

    this.switchModal();
  };
  showNextImage = () => {
    let nextIndex = this.state.modalImageIndex + 1;

    if (nextIndex >= this.state.image.length) {
      nextIndex = 0;
    }

    this.setState({
      modalImageIndex: nextIndex,
    });
  };

  showPrevImage = () => {
    let prevIndex = this.state.modalImageIndex - 1;

    if (prevIndex < 0) {
      prevIndex = this.state.image.length - 1;
    }

    this.setState({
      modalImageIndex: prevIndex,
    });
  };
  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ image: [], status: 'pending', value: false });

      fetch(
        `https://pixabay.com/api/?key=25742828-fa226770f9336c5f983da529f&q=${this.state.imageName}&image_type=photo&orientation=horizontal&safesearch&per_page=12&page=${this.state.page}`
      )
        .then(response => {
          if (response.ok) {
            let data = response.json();
            return data;
          }
          return Promise.reject(
            new Error(
              `Sorry, there are no images matching your search query ${this.state.imageName}. Please try again.`
            )
          );
        })
        .then(data => {
          const { hits, total } = data;
          this.setState({
            image: hits,
            status: 'resolved',
            total: total,
            value: true,
          });
          if (total === 0) {
            this.setState({ value: false });
            toast.warning(
              `Sorry, there are no images matching your search query. Please try again.`
            );
          }
          if (total < 12) {
            this.setState({ value: false });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending', value: false });
      fetch(
        `https://pixabay.com/api/?key=25742828-fa226770f9336c5f983da529f&q=${this.state.imageName}&image_type=photo&orientation=horizontal&safesearch&per_page=12&page=${this.state.page}`
      )
        .then(response => {
          if (response.ok) {
            let data = response.json();
            return data;
          }
          return Promise.reject(
            new Error(
              `Sorry, there are no images matching your search query ${this.state.imageName}. Please try again.`
            )
          );
        })
        .then(data => {
          const { image } = this.state;
          const { hits } = data;
          if (hits.length === 12) {
            return this.setState({
              image: [...image, ...hits],
              status: 'resolved',
              value: true,
            });
          }
          if (hits.length !== 12) {
            return this.setState({
              image: [...image, ...hits],
              status: 'resolved',
              value: false,
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      scroll.scrollToBottom();
    }
  }

  render() {
    const { image, error, status, value, isModalOpen, modalImageIndex } =
      this.state;
    const { onGalleryListClick, switchModal, showNextImage, showPrevImage } =
      this;

    return (
      <div>
        <Container>
          <Searchbar onSubmit={this.handleSearchFormSubmit} />
        </Container>
        <Section nameForClass={'sectionList'}>
          <ImageGallery
            image={image}
            error={error}
            status={status}
            onClick={onGalleryListClick}
          />
          {value && <Button handleIncrement={this.handleIncrement} />}
        </Section>
        {isModalOpen && (
          <Modal
            image={image}
            photoIndex={modalImageIndex}
            onClose={switchModal}
            nextImage={showNextImage}
            prevImage={showPrevImage}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
