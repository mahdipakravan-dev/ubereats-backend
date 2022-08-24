export interface NotifierInterface {}

export enum NotifiersEnum {
  SMS,
  EMAIL,
}

export type NotifierHashMap = {
  [NotifiersEnum.SMS]: NotifierMessage.Sms;
  [NotifiersEnum.EMAIL]: NotifierMessage.Email;
};

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
