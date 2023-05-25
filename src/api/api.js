import axios from "axios"

const BASE_URL = "https://sneakers-store-project.onrender.com";
export const getSneakers = async () => {
    // variant 1
    // const { data } = await axios.get('/contcts')
    // return data;

    // variant 2
    // const data = await fetch(`${BASE_URL}/contacts`)
    // return await data.json();

    // variant 3
    return fetch(`${BASE_URL}/sneakers`).then(response => response.json());
};
export const findSneakers = async (query) => {
    return fetch(`${BASE_URL}/sneakers?title_like=${query}`).then(response => response.json())
 }
