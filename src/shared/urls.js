// export const mainUrl = "https://devtiosam.herokuapp.com"
// export const mainUrl = "http://localhost:3000"
export const productsUrl = "products";
export const buysUrl = "buys";
export const loginUrl = "auth/login";
export const companyUrl = "companies";
export const importationUrl = "importations";
export const clientUrl = "clients";
export const sellUrl = "sells";
export const storagesUrl = "storages";

export const mainUrl = () => {
  const devUrl = "https://devtiosam.herokuapp.com";
  const localUrl = "http://localhost:3000";
  const prodUrl = "https://tiosam.herokuapp.com";
  if (process.env.NODE_ENV == "production") return prodUrl;
  return devUrl;
};
