import axios from "axios";
import { DateTime } from "luxon";

const fecha = DateTime.now().minus({ years: 1 }).toFormat("yyyy-LL");
const fecha2 = DateTime.fromISO(fecha)
  .plus({ months: 1 })
  .minus({ days: 1 })
  .toFormat("yyyy-LL-dd");

export default async function handler(req, res) {
  let { filtro_max, filtro_min } = req.query;
  if (filtro_max === undefined) {
    filtro_max = fecha2;
  }
  if (filtro_min === undefined) {
    filtro_min = fecha;
  }

  try {
    const url = `${process.env.WC_URL}/reports/sales?date_min=${filtro_min}-01&date_max=${filtro_max}`;
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
