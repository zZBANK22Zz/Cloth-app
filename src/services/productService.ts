import { config } from "@/config";
import {
  createProductDTO,
  Product,
  UpdateProductDTO,
} from "@/types/productType";
import axios from "axios";

const fetchMyProducts = async (offset = 0, limit = config.PAGE_SIZE) => {
  const url = `${config.API_URL}/products/my?offset=${offset}&limit=${limit}`;
  return axios.get<{ total: number, data: Product[]}>(url).then((res) => res.data);
};

const fetchProducts = async (offset = 0, limit = config.PAGE_SIZE) => {
  const url = `${config.API_URL}/products?offset=${offset}&limit=${limit}`;
  return axios.get<{ total: number, data: Product[]}>(url).then((res) => res.data);
};

const fetchProduct = async (productId: string) => {
  const url = `${config.API_URL}/products/${productId}`;
  return axios.get<Product>(url).then((res) => res.data);
};

const createProduct = async (dto: createProductDTO) => {
  const url = `${config.API_URL}/products`;
  return axios.post<Product>(url, dto).then((res) => res.data);
};

const updateProduct = async (productId: string, dto: UpdateProductDTO) => {
  const url = `${config.API_URL}/products/${productId}`;
  return axios.patch<Product>(url, dto).then((res) => res.data);
};

const deleteProduct = async (productId: string) => {
  const url = `${config.API_URL}/products/${productId}`;
  return axios.delete<string>(url).then((res) => res.data);
};

const productService = {
  fetchMyProducts,
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;