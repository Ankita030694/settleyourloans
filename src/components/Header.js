import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./../assets/img/logo/logo.png";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(`${process.env.REACT_APP_GRAPH_API_KEY}`);

const QUERY = gql`
  {
    services {
      title
      slug
      des
      coverPhoto {
        url
      }
    }
  }
`;

function Header() {
  const [posts, setPosts] = useState();
  const [sideBar, setSidebar] = useState(false);
  const getPosts = async () => {
    const { services } = await graphcms.request(QUERY);
    console.log(services);
    setPosts(services);
  };
  useEffect(() => {
    if (!posts) {
      getPosts();
    }
  }, [posts]);
  const changeSideBar = (e) => {
    e.preventDefault();
    if (!sideBar) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  };
  return (
    <>
      <header>
        <div
          id="header-sticky"
          className="header__area header__transparent header__space header__plr"
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-7 col-md-6">
                <div className="header__logo">
                  <Link to="/">
                    <img src={Logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 d-none d-lg-block">
                <div className="header__main-menu text-xxl-end text-center">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li className="has-dropdown">
                        <Link to="/">Services</Link>
                        <ul className="submenu">
                          {posts &&
                            posts.map((s) => (
                              <li>
                                <Link to={`/service/${s.slug}`}>{s.title}</Link>
                              </li>
                            ))}
                          {/* <li>
                            <a href="service-1.html">Service 01</a>
                          </li>
                          <li>
                            <a href="service-2.html">Service 02</a>
                          </li>
                          <li>
                            <a href="service-3.html">Service 03</a>
                          </li>
                          <li>
                            <a href="service-details.html">Service Details</a>
                          </li> */}
                        </ul>
                      </li>
                      <li>
                        <Link to="/blogs">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-2 col-5 col-md-6">
                <div className="header__action d-flex justify-content-end">
                  <a
                    className="header__get__whatsapp"
                    href="tel:+919821219819"
                    target="_blank"
                  >

                    <span>Free Consultation</span>
                    <b />
                  </a>
                  <div className="header__menu-bar">
                    <button className="it-menu-bar" onClick={changeSideBar}>
                      <i className="far fa-bars" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="it-offcanvas-area">
        <div className={sideBar ? `itoffcanvas opened` : `itoffcanvas`}>
          <div className="it-offcanva-bottom-shape d-none d-xxl-block">
            <img src="assets/img/offcanvas/offcanvas-shape-1.jpg" alt="" />
          </div>
          <div className="itoffcanvas__close-btn">
            <button className="close-btn" onClick={changeSideBar}>
              <i className="fal fa-times" />
            </button>
          </div>
          <div className="itoffcanvas__logo">
            <a href="/">
              <img src="https://i.ibb.co/p2pWRRM/logo.png" alt="" />
            </a>
          </div>
          <div className="itoffcanvas__text">
            <p>
              Settle Loans swiftly stops bank harassment and initiates legal
              proceedings within 24 hours.
            </p>
          </div>
          <div className="mobile-menu mean-container" />
          <div className="itoffcanvas__info">
            <div className="it-info-wrapper mb-20 d-flex align-items-center mobile-nav">


              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                  <li className="has-dropdown">
                    <Link to="/">Services</Link>
                    <ul className="submenu">
                         {/* <a>
                         {posts &&
                            posts.map((s) => (
                              <li>
                                <Link to={`/service/${s.slug}`}>{s.title}</Link>
                              </li>
                            ))}
                         </a> */}
                    </ul>
                  </li>
                <li>
                  <Link to="/blogs">Blogs</Link>
                </li>
                <li>
                  <Link to="/faq">FAQs</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>

            </div>
            <h3 className="offcanva-title">Get In Touch</h3>
            <div className="it-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fal fa-envelope" />
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Email</span>
                <a href="maito:hello@yourmail.com">
                  <span
                    className="__cf_email__"
                    data-cfemail="a9c1ccc5c5c6e9d0c6dcdbc4c8c0c587cac6c4"
                    href="mail.com/info@settleloans,"
                  >
                    info@settleloans.in
                  </span>
                </a>
              </div>
            </div>
            <div className="it-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fal fa-phone-alt" />
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Phone</span>
                <a href="tel:+919821219819">+919821219819</a>
              </div>
            </div>
            <div className="it-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fas fa-map-marker-alt" />
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Location</span>
                <a
                  href="htits://www.google.com/maps/@37.4801311,22.8928877,3z"
                  target="_blank"
                >
                  PAN India
                </a>
              </div>
            </div>
          </div>
          <div className="itoffcanvas__social">
            <div className="social-icon">
              <a href="https://www.linkedin.com/company/settleloans/">
                <i className="fab fa-linkedin" />
              </a>
              <a href="https://instagram.com/settleloans?igshid=YmMyMTA2M2Y=">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100089458940627&mibextid=LQQJ4d">
                <i className="fab fa-facebook-square" />
              </a>
              <a href="https://www.youtube.com/@settleloans/">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={sideBar ? `body-overlay apply` : `body-overlay`} />
    </>
  );
}

export default Header;
