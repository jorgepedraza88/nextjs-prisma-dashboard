import axios from "axios";

export default async function handler(req, res) {
  const id = req.query.id;
  const body = req.body;

  try {
    const url = `${process.env.WC_URL}/orders/${id}`;
    const response = await axios({
      method: "put",
      url: url,
      headers: {
        Authorization: process.env.API_KEY_WOOCOMMERCE,
      },
      data: body,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
}
