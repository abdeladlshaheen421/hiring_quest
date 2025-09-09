export interface MysqlConfigInterface {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface SmtpConfigInterface {
  host: string;
  port: number;
  user: string;
  pass: string;
}
