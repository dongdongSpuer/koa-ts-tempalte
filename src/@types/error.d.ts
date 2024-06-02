type ErrorList = Record<string, ErrorType>;
interface ErrorType {
  code: number;
  statusCode: number;
  msg: string;
  data: any;
  [key: string]: any;
}
