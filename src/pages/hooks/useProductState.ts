import { useState } from "react";

const useProductState = () => {
  //name
  //category
  //description
  //price
  //color
  //sizes
  //material
  //brand
  //imageURL
  //imageURLs
  //tags
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState([]);
  const [material, setMaterial] = useState("");
  const [brand, setBrand] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageURLs, setImageURLs] = useState([]);
  const [tags, setTags] = useState([]);

  return {
    name,
    setName,
    category,
    setCategory,
    description,
    setDescription,
    price,
    setPrice,
    color,
    setColor,
    sizes,
    setSizes,
    material,
    setMaterial,
    brand,
    setBrand,
    imageURL,
    setImageURL,
    imageURLs,
    setImageURLs,
    tags,
    setTags,
  }
};

export default useProductState;
