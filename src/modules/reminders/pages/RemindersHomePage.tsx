import { RemindersDateCalendar } from "../components/DateCalendar";
import { NewReminder } from "../components/NewReminder";
import "../styles/remindersStyles.scss";

export const RemindersHomePage = () => {
  return (
    <>
      <h1>Powiadomienia</h1>
      <div className="reminders-content">
        <div className="calendar">
          <RemindersDateCalendar />
        </div>
        <div className="set-reminder">
          <h3>Ustaw powiadomienie:</h3>
          <NewReminder />
        </div>
      </div>
    </>
  );
};
