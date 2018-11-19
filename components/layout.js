import Head from 'next/head'
import { Component } from 'react'
import Navbar from './navbar'
import { initGA, logPageView } from '../utils'

import stylesheet from 'styles/application.scss'

export default class Layout extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    const { 
      children, 
      isMobile, 
      navbarColor,
      currentPage, 
      styles = { height: 'inherit', width: 'inherit', bgColor: '#fff', headerColor: 'transparent' },
      router
    } = this.props
    return (
      <div id="tedx_body">
        <Head>
          <title>TEDxCharoenkrung</title>
          <meta charSet='utf-8' />
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="google-site-verification" content="vG0fl4beH0zBzva-O48fr36I4vuPh7kRxa_VwguUT1w" />
          <meta name='viewport' content='initiali-scale=1.0, width=device-width' />
          <link rel="icon" href="static/icons/tedx.ico" />
          <meta name="description" content="TEDxChareonkrung คือการรวมตัวของกลุ่มคนที่เชื่อว่า ‘พลังความคิด’ สามารถสร้างแรงขับอันแรงกล้าเพื่อพัฒนา ‘กรุง’ ของเราให้ ‘เจริญ’ ยิ่งขึ้น"/>

          <meta property="og:title" content="TEDxCharoenkrung" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="http://s3-ap-southeast-1.amazonaws.com/tedxcharoenkrung/tedx_charoenkrung.jpg" />
          <meta property="og:url" content="https://tedxcharoenkrung.com" />
          <meta property="og:site_name" content="TEDxCharoenkrung" />
          <meta property="og:description" content="TEDxChareonkrung คือการรวมตัวของกลุ่มคนที่เชื่อว่า ‘พลังความคิด’ สามารถสร้างแรงขับอันแรงกล้าเพื่อพัฒนา ‘กรุง’ ของเราให้ ‘เจริญ’ ยิ่งขึ้น" />
        </Head>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <header id="tedx_header" style={{ 'backgroundColor': styles.headerColor }}>
          <Navbar currentPage={currentPage} isMobile={isMobile} navbarColor={navbarColor} router={router}/>
        </header>
        <main id="tedx_main_container"
          style={{
            height: styles.height,
            width: styles.width,
            backgroundColor: styles.bgColor,
            display: 'table'
          }}>
          {children}
        </main>
        <script src="../static/js/jquery-3.2.1.slim.min.js" />
        <script src="../static/js/bootstrap.min.js" />
      </div>
    )
  }
}

// const Layout = ({ children, isMobile, navbarColor, currentPage, styles = { height: 'inherit', width: 'inherit', bgColor: '#fff', headerColor: 'transparent' } }) => (

// )

// export default Layout