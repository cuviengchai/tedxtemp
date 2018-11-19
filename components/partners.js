
const Partners = ({ content, isMobile }) => (
  <div id="tedx_partners_contents_topic">
    {content.topic}
    <div id="tedx_partners_contents_image">
      { content.images.map((image, index) =>
        <figure>
          <img key={index} src={image.imageUrl} style={{ padding: '10px',height: '150px', width: isMobile ? '80%' : 'auto' }}
          className="img-fluid"></img>
          <figcaption dangerouslySetInnerHTML={{__html: image.description}}></figcaption>
        </figure>
      ) }
    </div>
  </div>

)

export default Partners
