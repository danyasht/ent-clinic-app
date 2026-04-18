interface DetailItem {
  name: string;
  value: string;
}

export interface ProfileDetailItem extends DetailItem {
  icon: React.ReactNode;
}

export interface AppointmentDetailItem {
  name: string;
  value: string | React.ReactNode;
}
