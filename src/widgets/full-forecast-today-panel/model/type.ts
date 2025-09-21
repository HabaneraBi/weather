import { JSX } from "react";

export type ForecastEntityInfo = {
  header: string;
  value: string | number;
  icon: string | JSX.Element;
};
