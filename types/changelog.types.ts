export interface ChangeLogPropType {
  id: string;
  title: string;
  desc: string;
  date: string;
}

export interface ChangeLog {
  id: string;
  title: string;
  desc: string;
  date: string;
  detailedDesc?: string;
}