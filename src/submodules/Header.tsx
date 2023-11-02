import waffleLogo from "../assets/icon_intro.svg";
import { Link } from "react-router-dom";

function Header(props: {
	pageType: string
}) {
  return (
    <>
      <header data-testid="header">
        <h1 className="header">
          <div className="header-content">
            <a href="https://wafflestudio.com" className="invisible-link">
              <img
                alt="logo"
                src={waffleLogo}
                decoding="async"
                className="icon"
                data-testid="waffle-logo"
              />
            </a>
            <a href="https://wafflestudio.com" className="invisible-link">
              <span className="header-text" data-testid="header-title">
                과자 리뷰
              </span>
            </a>
						<Link to="/" className={props.pageType === "review" ? "bold-pagetype" : "thin-pagetype"}>
							리뷰
						</Link>
						<Link to="/snacks" className={props.pageType === "review" ? "thin-pagetype" : "bold-pagetype"}>
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
