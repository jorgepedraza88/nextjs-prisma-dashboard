import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = `${process.env.WC_URL}/reports/top_sellers?period=last_month`;
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
