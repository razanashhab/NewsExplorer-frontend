import github from "../images/github.svg";
import facebook from "../images/fb.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        {" "}
        {`© ${new Date().getFullYear()} Supersite, Powered by News API`}{" "}
      </p>{" "}
      <ul className="footer__list">
        <li className="footer__list-item footer__list-item_position_home">
          <a href="/" className="footer__link">
            Home{" "}
          </a>{" "}
        </li>{" "}
        <li className="footer__list-item footer__list-item_position_practicum">
          <a
            href="https://tripleten.co.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            Practicum{" "}
          </a>{" "}
        </li>{" "}
        <li className="footer__list-item footer__list-item_position_github">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <img src={github} alt="Github" className="footer__social-icon" />
          </a>{" "}
        </li>{" "}
        <li className="footer__list-item footer__list-item_position_facebook">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <img
              src={facebook}
              alt="Facebook"
              className="footer__social-icon"
            />
          </a>{" "}
        </li>{" "}
      </ul>{" "}
    </footer>
  );
}

export default Footer;
