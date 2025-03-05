import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { plPL } from "@mui/x-date-pickers/locales";
import { useState } from "react";

export const NewReminder = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        plPL.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          views={["day", "month", "year", "hours", "minutes", "seconds"]}
          format="LLL"
          localeText={
            plPL.components.MuiLocalizationProvider.defaultProps.localeText
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
