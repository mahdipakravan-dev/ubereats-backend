export interface NotifierInterface {}

export enum PublishersEnum {
  SMS,
  EMAIL,
}

export namespace NotifierMessage {
  export type Result = {};
  export type Sms = {
    message: string;
    phoneNumber: string;
  };
  export type Email = {
    email: string;
    subject: string;
    message: string;
  };
}
