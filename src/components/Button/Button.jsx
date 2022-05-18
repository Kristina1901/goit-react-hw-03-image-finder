import PropTypes from 'prop-types';
import s from 'components/Button/Button.module.css';
const Button = ({ handleIncrement }) => (
  <button type="button" className={s.button} onClick={handleIncrement}>
    Load more
  </button>
);

export default Button;
Button.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};
