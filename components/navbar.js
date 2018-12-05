import { Component } from "react";
import Link from "next/link";

import $ from "jquery";
import Router from "next/router";
import { translate } from "react-i18next";

import i18n from "../i18n";

Router.onRouteChangeStart = url => {
  console.log("App is changing to: ", url);
  location.href = url;
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: "",
      colorStyle: props.navbarColor,
      currentPage: props.currentPage
    };
  }

  navigateTo(page) {
    this.toggleHamburger();
  }

  toggleHamburger() {
    const isOpen = this.state.isOpen;
    this.setState({
      isOpen: isOpen ? "" : "open"
    });
  }

  componentWillUnmount() {
    $(`#${this.state.currentPage}`).removeClass("active");
  }

  componentDidMount() {
    $(`#${this.state.currentPage}`).addClass("active");
  }

  getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  modifyLanguageQuery(lng) {
    const currentPath = this.props.router.pathname;
    const currentLngQuery = this.props.router.query.lng;
    const lngQuery = this.getParameterByName("lng", this.props.router.asPath);
    const uidQuery = this.getParameterByName("uid", this.props.router.asPath);

    if (currentPath !== "/blog" && uidQuery && lngQuery)
      return Object.assign({}, { lng: lngQuery });
    if (uidQuery && lngQuery && lng) {
      return Object.assign({}, { uid: uidQuery }, lng);
    }
    return Object.assign({}, lng ? lng : { lng: currentLngQuery });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md bg-faded justify-content-center tedx_navbar">
        <Link
          prefetch
          href={{ pathname: "/", query: this.modifyLanguageQuery() }}
        >
          <a
            className={`tedx_logo navbar-brand mr-auto ${
              this.state.colorStyle
            }`}
            href="#"
            onClick={() => this.navigateTo()}
          >
            <span className="sr-only">TEDxCharoenkrung</span>
          </a>
        </Link>
        <button
          className="navbar-toggler tedx_hamburger_button"
          type="button"
          onClick={() => this.toggleHamburger()}
        >
          <div id="tedx_hamburger_icon" className={this.state.isOpen}>
            <span className={`icon-bar ${this.state.colorStyle}`} />
            <span className={`icon-bar ${this.state.colorStyle}`} />
            <span className={`icon-bar ${this.state.colorStyle}`} />
          </div>
        </button>
        <div
          className={`collapse navbar-collapse ${
            this.state.isOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
            <li className="nav-item tedx_menu_item">
              <a
                id="watch"
                className={`nav-link tedx_link ${this.state.colorStyle}`}
                href="#"
                onClick={() => this.navigateTo()}
              >
                {this.props.t("common:watch")}
              </a>
            </li>
            <Link
              prefetch
              href={{ pathname: "/read", query: this.modifyLanguageQuery() }}
            >
              <li className="nav-item tedx_menu_item">
                <a
                  id="read"
                  className={`nav-link tedx_link ${this.state.colorStyle}`}
                  href="#"
                  onClick={() => this.navigateTo("read")}
                >
                  {this.props.t("common:read")}
                </a>
              </li>
            </Link>
            <Link
              prefetch
              href={{
                pathname: "/speakers",
                query: this.modifyLanguageQuery()
              }}
            >
              <li className="nav-item tedx_menu_item">
                <a
                  id="speakers"
                  className={`nav-link tedx_link ${this.state.colorStyle}`}
                  href="#"
                  onClick={() => this.navigateTo("speakers")}
                >
                  {this.props.t("common:speakers")}
                </a>
              </li>
            </Link>
            <Link
              prefetch
              href={{
                pathname: "/partners",
                query: this.modifyLanguageQuery()
              }}
            >
              <li className="nav-item tedx_menu_item">
                <a
                  id="partners"
                  className={`nav-link tedx_link ${this.state.colorStyle}`}
                  href="#"
                  onClick={() => this.navigateTo("partners")}
                >
                  {this.props.t("common:partners")}
                </a>
              </li>
            </Link>
            <Link
              prefetch
              href={{ pathname: "/about", query: this.modifyLanguageQuery() }}
            >
              <li className="nav-item tedx_menu_item">
                <a
                  id="about"
                  className={`nav-link tedx_link ${this.state.colorStyle}`}
                  href="#"
                  onClick={() => this.navigateTo("about")}
                >
                  {this.props.t("common:about")}
                </a>
              </li>
            </Link>
            <Link
              href={{
                pathname: this.props.router.pathname,
                query: this.modifyLanguageQuery({ lng: "en" })
              }}
            >
              <li className="nav-item tedx_menu_item">
                <span
                  id="lngEN"
                  className={`nav-link tedx_link`}
                  style={{
                    height: 24,
                    width: 24,
                    backgroundImage: "url(static/images/flags/gb-flags.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    cursor: "pointer",
                    display: "block"
                  }}
                  onClick={() => this.navigateTo()}
                />
              </li>
            </Link>
            <Link
              href={{
                pathname: this.props.router.pathname,
                query: this.modifyLanguageQuery({ lng: "th" })
              }}
            >
              <li className="nav-item tedx_menu_item">
                <span
                  id="lngTH"
                  className={`nav-link tedx_link`}
                  style={{
                    height: 24,
                    width: 24,
                    backgroundImage: "url(static/images/flags/th-flags.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    cursor: "pointer",
                    display: "block"
                  }}
                  onClick={() => this.navigateTo()}
                />
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export default translate()(Navbar);
