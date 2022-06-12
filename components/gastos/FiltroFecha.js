import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const FiltroFecha = ({ startDate, setStartDate }) => {
  return (
    <div className="flex flex-col justify-end">
      <div className="flex items-center gap-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          locale="en"
          dateFormat="LLLL - yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          className="cursor-pointer rounded bg-stone-50 p-2 text-center font-bonita font-semibold uppercase text-sky-600 border border-stone-200 shadow outline-none"
          calendarClassName="capitalize font-medium"
          popperPlacement="bottom-end"
        />
      </div>
    </div>
  );
};

export default FiltroFecha;
