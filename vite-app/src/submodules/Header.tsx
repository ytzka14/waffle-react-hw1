import '../App.css'
import waffleLogo from "../assets/icon_intro.svg"

function Header() {

  return (
    <>
      <header data-testid="header">
				<h1 className="header">
					<div className="headerContent">
						<a href="https://wafflestudio.com" className="invisibleLink">
							<img alt="logo" src={waffleLogo} decoding="async" className="icon" data-testid="waffle-logo"/>
						</a>
						<a href="https://wafflestudio.com" className="invisibleLink">
							<span className="headerText" data-testid="header-title">과자 리뷰</span>
						</a>
					</div>
				</h1>
			</header>
    </>
  )
}

export default Header;
