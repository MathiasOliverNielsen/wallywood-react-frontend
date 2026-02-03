import style from "./Footer.module.scss";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className={style.footerStyle}>
      <section>
        <div>
          <h3>WALLYWOOD</h3>
          <p>Øster Uttrupvej 1</p>
          <p>9000 Aalborg</p>
        </div>
        <div>
          <p>CVR: 123512512</p>
          <p>Mail: info@plakatshoppen.dk</p>
          <p>MOBIL: +45 1232 2323</p>
        </div>
      </section>
      <section className={style.socialIcons}>
        <FaPinterest />
        <FaInstagram />
        <FaFacebook />
        <FaTwitter />
      </section>
    </footer>
  );
}
