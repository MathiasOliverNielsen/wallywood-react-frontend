import style from "./aboutUs.module.scss";
import { Title } from "../../Components/ui/Title/Title";
import starImage from "../../assets/images/star-with-shadows_78370-2595.avif";

export function AboutUs() {
  return (
    <div className={style.aboutUsContainer}>
      <Title text="Om os" />

      <section className={style.aboutSection}>
        <div className={style.aboutContent}>
          <div className={style.textContent}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque ac ipsum sed faucibus. Vivamus mollis sagittis hendrerit. Donec turpis erat, vestibulum non turpis sed, finibus
              congue velit. Pellentesque sagittis est eget nisl malesuada, a aliquet est imperdiet. Aenean dapibus finibus laoreet. Pellentesque suscipit hendrerit enim, non tempor erat sodales quis.
              Nullam sed enim eu elit posuere commodo at in nisl. Aliquam egestas turpis vel odio consectetur auctor. Cras porttitor orci non scelerisque porttitor. Phasellus dictum ligula rutrum
              neque pharetra, faucibus molestie libero ultrices. Aenean risus risus, sollicitudin at rutrum vel, venenatis ac urna. Phasellus a pulvinar massa.
            </p>

            <p>
              Phasellus faucibus libero eu malesuada tristique. Donec tristique lacus in ipsum sollicitudin viverra. Sed porttitor sit amet felis accumsan egestas. Fusce quis commodo urna, non feugiat
              odio. Nam in tempus magna. Quisque eu neque sed lacus egestas pulvinar eget in lacus. Quisque sit amet sem efficitur sapien bibendum mollis. Quisque in eros sit amet justo scelerisque
              rutrum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque ac ipsum sed faucibus. Vivamus mollis sagittis hendrerit. Donec turpis erat, vestibulum non turpis sed, finibus
              congue velit. Pellentesque sagittis est eget nisl malesuada, a aliquet est imperdiet. Aenean dapibus finibus laoreet. Pellentesque suscipit hendrerit enim, non tempor erat sodales quis.
              Nullam sed enim eu elit posuere commodo at in nisl.
            </p>
          </div>

          <div className={style.imageContent}>
            <img src={starImage} alt="Wallywood Star" className={style.starImage} />
          </div>
        </div>
      </section>
    </div>
  );
}
