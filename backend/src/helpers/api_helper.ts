import { type Response } from 'express';

/**
 * Função padrão para resposta de erro generico no lado do servidor
 * @param {Response} res - Variavel de resposta
 */
export function reply_status_500(res: Response) {
  res.status(500).send('Erro no servidor')
}

/**
 * Função padrão para resposta de erro generico no lado do cliente
 * @param {Response} res - Variavel de resposta
 */
export function reply_status_400(res: Response) {
  res.status(500).send('Erro no cliente')
}
