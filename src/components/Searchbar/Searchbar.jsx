import { Component } from 'react';
import { toast } from 'react-toastify';
import s from 'components/Searchbar/Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
export default class Searchbar extends Component {
  state = {
    imageName: '',
  };
  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast.error('Enter a keyword to search!');
      return;
    }

    this.props.onSubmit(this.state.imageName);
    // this.setState({ imageName: '' });
  };
  render() {
    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className="button-label">
              <ImSearch style={{ marginRight: 8 }} />
              Search
            </span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.imageName}
            placeholder={
              this.state.imageName === ''
                ? 'Search images and photos'
                : this.state.imageName
            }
            onChange={this.handleNameChange}
          />
        </form>
      </div>
    );
  }
}
