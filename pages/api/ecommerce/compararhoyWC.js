import axios from "axios";
import { DateTime } from "luxon";

const fecha = DateTime.now().minus({ weeks: 52 }).toFormat("yyyy-LL-dd");
const fecha2 = DateTime.fromISO(fecha).plus({ hours: 2 }).toFormat("yyyy-LL-dd");

export default async function handler(req, res) {
  try {
    const url = `${process.env.WC_URL}/reports/sales?date_min=${fecha}&date_max=${fecha2}`;
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
