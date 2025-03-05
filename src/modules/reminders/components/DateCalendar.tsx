import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { plPL } from "@mui/x-date-pickers/locales";

const initialValue = dayjs();
const highlightedDays = [1, 2, 15, 20];

const ServerDay = (
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <NotificationsIcon sx={{ color: "red", fontSize: 16 }} />
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

export const RemindersDateCalendar = () => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        plPL.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DateCalendar
        defaultValue={initialValue}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as PickersDayProps<Dayjs> & { highlightedDays: number[] },
        }}
      />
    </LocalizationProvider>
  );
};
