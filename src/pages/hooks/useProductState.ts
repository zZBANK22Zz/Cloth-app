import { colors } from "@nextui-org/react";
import { useState } from "react";

const useProductStates = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [material, setMaterial] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  return {
    name,
    setName,
    category,
    setCategory,
    description,
    setDescription,
    price,
    setPrice,
    colors,
    setColors,
    sizes,
    setSizes,
    material,
    setMaterial,
    brand,
    setBrand,
    imageUrl,
    setImageUrl,
    imageUrls,
    setImageUrls,
    tags,
    setTags,
  };
};

export default useProductStates;