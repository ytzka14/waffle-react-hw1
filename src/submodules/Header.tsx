import waffleLogo from "../assets/icon_intro.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header data-testid="header">
        <h1 className="header">
          <div className="headerContent">
            <a href="https://wafflestudio.com" className="invisibleLink">
              <img
                alt="logo"
                src={waffleLogo}
                decoding="async"
                className="icon"
                data-testid="waffle-logo"
              />
            </a>
            <a href="https://wafflestudio.com" className="invisibleLink">
              <span className="headerText" data-testid="header-title">
                과자 리뷰
              </span>
            </a>
          </div>
					<Link to="/">
						리뷰
					</Link>
					<Link to="/snacks">
						과자
					</Link>
        </h1>
				<h4></h4>
      </header>
    </>
  );
}

export default Header;
