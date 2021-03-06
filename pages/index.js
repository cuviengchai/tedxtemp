import { Component } from "react";
import $ from "jquery";
import jump from "jump.js";

import Layout from "../components/layout";
import Carousel from "../components/carousel";

import { withRouter } from "next/router";
import { translate } from "react-i18next";
import i18n from "../i18n";

import { isElementInView, easeInOutQuad } from "../utils";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLanding: true,
      isMobile: props.userAgent
        ? this.checkIsMobileDevice(props.userAgent)
        : false
    };

    this.checkElementInViewAndUpdateStyle = this.checkElementInViewAndUpdateStyle.bind(
      this
    );
    this.updateStyle = this.updateStyle.bind(this);
    this.smoothScrollingTo = this.smoothScrollingTo.bind(this);
  }

  static async getInitialProps({ req }) {
    if (req && !process.browser) {
      return Object.assign(
        i18n.getInitialProps(req, ["common", "landing", "home"]),
        req
          ? { userAgent: req.headers["user-agent"] }
          : { userAgent: navigator.userAgent }
      );
    }
    return req
      ? { userAgent: req.headers["user-agent"] }
      : { userAgent: navigator.userAgent };
  }

  checkIsMobileDevice(userAgent) {
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        userAgent.substr(0, 4)
      )
    );
  }

  calculateStyles() {
    return this.state.isLanding
      ? {
          height: "inherit",
          width: "inherit",
          bgColor: "transparent",
          headerColor: "transparent"
        }
      : {
          height: "inherit",
          width: "inherit",
          bgColor: "transparent",
          headerColor: "transparent"
        };
  }

  checkElementInViewAndUpdateStyle() {
    let scroll = false;
    // detect scroll end
    // clearTimeout($.data(this, 'scrollTimer'));
    // $.data(this, 'scrollTimer', setTimeout(() => {
    //   if (isElementInView('#home')) {
    //     this.smoothScrollingTo('home')
    //   }
    //   else if (isElementInView('#landing')) {
    //     this.smoothScrollingTo('landing')
    //   }
    // }, 500))

    if (!scroll) {
      if (isElementInView("#home")) {
        scroll = true;
        this.updateStyle(false, "white", "black");
      } else if (isElementInView("#landing")) {
        scroll = true;
        this.updateStyle(true, "white", "black");
      }
    }
  }

  updateStyle(isLanding, addedClass, removedClass) {
    [$(".icon-bar"), $(".tedx_logo"), $(".tedx_link")].map(el => {
      el.removeClass(removedClass);
      el.addClass(addedClass);
      this.setState({ isLanding: isLanding });
    });
  }

  smoothScrollingTo(to, duration = 1000) {
    const elementTo = document.getElementById(to).offsetTop;

    jump("body", {
      duration: duration,
      offset: elementTo,
      callback: undefined,
      easing: easeInOutQuad,
      a11y: false
    });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "load",
      this.checkElementInViewAndUpdateStyle,
      false
    );
    window.removeEventListener(
      "scroll",
      this.checkElementInViewAndUpdateStyle,
      false
    );
  }

  componentDidMount() {
    window.addEventListener(
      "load",
      this.checkElementInViewAndUpdateStyle,
      false
    );
    window.addEventListener(
      "scroll",
      this.checkElementInViewAndUpdateStyle,
      false
    );

    $("#goToHome").on("click", e => {
      this.smoothScrollingTo("home");
    });

    // $("#main-video").prop("playbackRate", 1);
    $("#main-video").prop("volume", 0);
  }

  render() {
    return (
      <Layout
        styles={this.calculateStyles()}
        currentPage={"home"}
        isMobile={this.state.isMobile}
        navbarColor={"white"}
        router={this.props.router}
      >
        <iframe
          src="https://www.facebook.com/v2.3/plugins/video.php?allowfullscreen=true&autoplay=true&container_width=800&href=https%3A%2F%2Fwww.facebook.com%2FTEDxCharoenkrung%2Fvideos%2F365142907273844%2F&show_text=0&width=560"
          style={{
            width: "100vw",
            height: "50vw",
            marginBottom: "-6px"
          }}
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allowFullScreen="true"
          frameborder="0"
        />
        {/* <video
          style={{
            width: "100vw",
            height: "auto",
            marginBottom: "-6px"
          }}
          autoPlay={true}
          id="main-video"
          // controls={true}
        >
          {/* <source src="https://scontent.fbkk12-3.fna.fbcdn.net/v/t42.1790-4/22895427_754743698043119_33561956782702592_n.mp4?_nc_cat=110&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_eui2=AeGJsLx9k7x0o_DiAskr_EzlEmNEP4olY-_addAy9xsPab-yoVtpMff3nRDIHwJpamM6NnMdH4nWIzwrZoiuLqbVnCTbJkLS6Lhd_ZjESx8Spg&_nc_ht=scontent.fbkk12-3.fna&oh=f228ceded5c1ba655d8c848ed76e3d58&oe=5C01368B" /> */}
        {/* <source src="https://www.facebook.com/TEDxCharoenkrung/videos/365142907273844/" />
        </video> */}
        <section id="landing">
          <a className="section_bottom" id="goToHome">
            <span className="scroll_down" />
          </a>
        </section>
        <section id="home">
          {/*  <span id="apply" className="text-center">
            <a className="text-center btn eventpop" href="http://go.eventpop.me/TEDxCharoenkrung">click for applying</a>
          </span> */}
          <Carousel isMobile={this.state.isMobile} router={this.props.router} />
        </section>
      </Layout>
    );
  }
}

export default withRouter(
  translate(["landing", "home"], { i18n, wait: process.browser })(Home)
);
