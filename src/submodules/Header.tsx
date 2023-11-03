import waffleLogo from "../assets/icon_intro.svg";
import { Link } from "react-router-dom";
import "./css/Header.css";

function Header(props: {
	pageType: string
}) {
  return (
    <>
      <header data-testid="header">
        <h1 className="hed-header">
          <div className="hed-header-content">
            <a href="https://wafflestudio.com" className="hed-invisible-link">
              <img
                alt="logo"
                src={waffleLogo}
                decoding="async"
                className="hed-icon"
                data-testid="waffle-logo"
              />
            </a>
            <a href="https://wafflestudio.com" className="hed-invisible-link">
              <span className="hed-header-text" data-testid="header-title">
                과자 리뷰
              </span>
            </a>
						<Link to="/" className={props.pageType === "review" ? "hed-bold-pagetype" : "hed-light-pagetype"} data-testid="review">
							리뷰
						</Link>
						<Link to="/snacks" className={props.pageType === "review" ? "hed-light-pagetype" : "hed-bold-pagetype"} data-testid="snack">
							과자
						</Link>
					</div>
        </h1>
				<h4></h4>
      </header>
    </>
  );
}

export default Header;
