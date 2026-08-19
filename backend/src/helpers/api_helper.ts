import { type Response } from "express";

type ReplyParams = {
  res: Response;
  status: number;
  message: string;
  other?: object;
};

/**
 * Resposta da API
 * @param param0 Argumentos
 */
export function reply({
  res,
  status,
  message,
  other} : ReplyParams
) {
  res.status(status).send({
    message: message,
    ...other,
  });
}
