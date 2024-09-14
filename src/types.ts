export type Errors = {
  _errors: string[];
} & {
  [key: string]: Errors;
};
