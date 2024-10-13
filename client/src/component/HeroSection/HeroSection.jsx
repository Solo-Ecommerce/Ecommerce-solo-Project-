import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./HeroSection.css";

function HeroSection() {
  const images = [
    "https://mybeautyfactory.fr/img/cms/box%20cosmo%20summer%20vibes%201000x500.png",
    "https://c8.alamy.com/compfr/2c5yph6/protection-solaire-ecran-solaire-et-publicites-diverses-vue-du-dessus-banniere-cosmetique-avec-coquillages-plantes-tropicales-et-planches-de-surf-sur-la-plage-vector-2c5yph6.jpg",
    "https://media.licdn.com/dms/image/v2/C5612AQGgyjgF937C6g/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1627978683286?e=1732147200&v=beta&t=pz6fn2XNJHUyZwFltYqfjb2CsnzgPRoiaKkMb169RcY",
    "https://photos.tf1info.fr/images/1024/576/creme-solaire-plage-1-a77481-0@1x.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero__container">
      <div className="side__bar__home">
        {/* <span className="text__side__bar__home"></span> */}
        <div className="icon__side__home">
          <span className="span">Cosmétiques</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className="icon__side__home">
          <span>Soins de la peau</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <span>Soins des cheveux</span>
        <span>Soins des yeux</span>
        <span>Soins des pieds</span>
      </div>
      <div>
        <div className="clipper__container__hero">
          <img
            className="image__clipper__hero"
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
