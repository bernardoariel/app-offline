export interface DialogHeader {
  title: string;
}

export interface DialogBody {
  icon: string;
  answer: string;
  colorClass: string;
  comment: string;
}

export interface DialogOptions {
  nameRouteToRedirect?: string;
  routeProp?: string;
  header: DialogHeader;
  body: DialogBody;
  footer?: any;
}
