export interface Settings {
  apiKey: string;
  hoursAppend: string;
  dateHeader: string;
  hoursHeader: string;
  dateFormat: {
    name: string;
    value: string;
  };
  separator: string;
  weekdayFormat: {
    name: string;
    value: string;
  };
  language: {
    name: string;
    value: string;
  };
}
