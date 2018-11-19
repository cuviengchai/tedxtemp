import { PureComponent } from 'react'
import $ from 'jquery'
import Link from 'next/link'
import { translate } from 'react-i18next'

import contents from '../contents'

class Carousel extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="home_section_slide">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            {
              contents()
                .sort(() => 0.5 - Math.random())
                .slice()
                .splice(0, 4)
                .map((content, index) => (
                  <Link key={index} prefetch href={{ pathname: '/blog', query: { uid: content.uid, lng: this.props.router.query.lng } }}>
                    <div className={`carousel-item ${index === 1 ? 'active' : ''} bg_plus_pos_y`}
                      style={{ 'backgroundImage': `url(${content.image.url})`, cursor: 'pointer' }}>
                      <div className="slide_content_container">
                        <h1 className="text-center slide_content_topic">{content.image.topic}</h1>
                        {
                          content.image.topic_lng === 'en'
                          ? <h1 className="text-center slide_content_desc">{content.image.desc}</h1>
                          : undefined
                        }
                      </div>
                    </div>
                  </Link>
                ))
              }
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    )
  }
}

export default translate()(Carousel)
