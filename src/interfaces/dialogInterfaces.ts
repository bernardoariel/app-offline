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

export interface DialogState {
  isDialogVisible: boolean;
  pendingRoute: string | null;
  routeProp: string | null;
  allowNavigation: boolean;
  header: {
    title: string;
  };
  body: {
    icon: string;
    comments: string;
    colorClass: string;
    answer: string;
  };
  footer: any;
}