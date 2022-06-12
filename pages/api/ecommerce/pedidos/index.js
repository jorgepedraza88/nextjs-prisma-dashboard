import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return getHandler(req, res);
  }

  async function getHandler(req, res) {
    let { page, search } = req.query;

    if (!page) {
      page = 1;
    }
    if (!search) {
      search = "";
    }
    try {
      const url = `${process.env.WC_URL}/orders?per_page=30&&orderby=date&order=desc&page=${page}&search=${search}`;
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: process.env.API_KEY_WOOCOMMERCE,
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}
