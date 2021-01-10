// ActionTypes - Prefix with the name of the hook
// global
export const FETCHING = `FETCHING`;
export const SUCCESS = `SUCCESS`;
export const ERROR = `ERROR`;
export const UNKNOWN = `UNKNOWN`;

let prefix = "useAuth/";

export const AUTHENTICATED = `${prefix}AUTHENTICATED`;
export const UNAUTHENTICATED = `${prefix}UNAUTHENTICATED`;

prefix = "useLogin/";

export const LOGIN_SUCCESS = `${prefix}LOGIN_SUCCESS`;
export const LOGIN_ERROR = `${prefix}LOGIN_ERROR`;
export const REGISTER_SUCCESS = `${prefix}REGISTER_SUCCESS`;
export const REGISTER_ERROR = `${prefix}REGISTER_ERROR`;
export const EMAIL_SENT = `${prefix}EMAIL_SENT`;
export const EMAIL_ERROR = `${prefix}EMAIL_ERROR`;
export const EMAIL_TAKEN = `${prefix}EMAIL_TAKEN`;
export const EMAIL_INVALID = `${prefix}EMAIL_INVALID`;
export const EMAIL_NOT_EXIST = `${prefix}EMAIL_NOT_EXIST`;
export const USERNAME_TAKEN = `${prefix}USERNAME_TAKEN`;
export const ID_OR_PWD_INCORRECT = `${prefix}ID_OR_PWD_INCORRECT`;
export const PASSWORD_NOT_MATCH = `${prefix}PASSWORD_NOT_MATCH`;
export const PASSWORD_TOO_SHORT = `${prefix}PASSWORD_TOO_SHORT`;
export const LOGIN_FETCHING = `${prefix}LOGIN_FETCHING`;
export const PROVIDE_PASSWORD = `${prefix}PROVIDE_PASSWORD`;

prefix = "useContact/";
export const FORM_SUCCESS = `${prefix}FORM_SUCCESS`;
export const FORM_FETCHING = `${prefix}FORM_FETCHING`;
export const FORM_ERROR = `${prefix}FORM_ERROR`;
export const FILES_SUCCESS = `${prefix}FILES_SUCCESS`;
export const FILES_FETCHING = `${prefix}FILES_FETCHING`;
export const FILES_ERROR = `${prefix}FILES_ERROR`;
export const CONTACT_UNKNOWN = `${prefix}CONTACT_UNKNOWN`;

prefix = "useAccount/";
export const USERNAME_FETCHING = `${prefix}USERNAME_FETCHING`;
export const EMAIL_FETCHING = `${prefix}EMAIL_FETCHING`;
export const PASSWORD_FETCHING = `${prefix}PASSWORD_FETCHING`;
export const USERNAME_UPDATED = `${prefix}USERNAME_UPDATED`;
export const USERNAME_TOO_LONG = `${prefix}USERNAME_TOO_LONG`;
export const USERNAME_TOO_SHORT = `${prefix}USERNAME_TOO_SHORT`;
export const PASSWORD_UPDATED = `${prefix}PASSWORD_UPDATED`;
export const PASSWORD_ERROR = `${prefix}PASSWORD_ERROR`;
export const EMAIL_UPDATED = `${prefix}EMAIL_UPDATED`;
export const EMAIL_FORMAT_ERROR = `${prefix}EMAIL_FORMAT_ERROR`;

prefix = "useRecoverPassword/";

