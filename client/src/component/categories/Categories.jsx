import React from "react";
import { GiLipstick, GiFootprint, GiAbstract001 } from "react-icons/gi";
import { FaCut, FaEye } from "react-icons/fa";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

function Categories({ SendCategory }) {
  const navigate = useNavigate();

  const handleProductCategory = (category) => {
    console.log("this is the product category: ", category, "category 1");
    SendCategory(category);

    switch (category) {
      case "Soins de la peau":
        navigate("./soinspeau", { state: { category } });
        break;
      case "Soins des cheveux":
        navigate("./soinscheveux", { state: { category } });
        break;
      case "Soins des yeux":
        navigate("./soinsyeux", { state: { category } });
        break;
      case "Soins des pieds":
        navigate("./soinspieds", { state: { category } });
        break;
      default:
        navigate("./cosmetiques", { state: { category } });
        break;
    }
  };

  return (
    <div className="container__categories">
      <div className="title__container__categories">
        <div className="color__for__title__categories"></div>
        <div className="title__categories">Nos categories</div>
      </div>
      <div className="voir__categories">Voir nos categories</div>

      <div className="all__categories">
        <div
          className="soins__peau__category space"
          onClick={() => handleProductCategory("Soins de la peau")}
        >
          <GiAbstract001 size={30} className="icon__categories" />
          <div className="text__categories">Soins de la peau</div>
        </div>
        <div
          className="soins__des__cheveux__category space"
          onClick={() => handleProductCategory("Soins des cheveux")}
        >
          <FaCut size={30} />
          <div className="text__categories">Soins des cheveux</div>
        </div>
        <div
          className="soins__des__yeux__category space"
          onClick={() => handleProductCategory("Soins des yeux")}
        >
          <FaEye size={30} />
          <div className="text__categories">Soins des yeux</div>
        </div>
        <div
          className="soins__des__pieds__category space"
          onClick={() => handleProductCategory("Soins des pieds")}
        >
          <GiFootprint size={30} />
          <div className="text__categories">Soins des pieds</div>
        </div>

        <div
          className="soins__cosmétiques__category space"
          onClick={() => handleProductCategory("cosmétiques")}
        >
          <GiLipstick size={30} />
          <div className="text__categories">Cosmétiques</div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
