import { type Response } from 'express';

/**
 * Função padrão para resposta de erro generico no lado do servidor
 * @param {Response} res - Variavel de resposta
 * @param {string} message - Menssagem explicando o erro
 */
export function reply_status_500(res: Response, message: string = 'Erro no servidor') {
  res.status(500).send({
    message: message
  })
}

/**
 * Função padrão para resposta de erro generico no lado do cliente
 * @param {Response} res - Variavel de resposta
 * @param {string} message - Menssagem explicando o erro
 */
export function reply_status_400(res: Response, message: string = 'Pessima Requisição') {
  res.status(400).send({
    message: message
  })
}

/**
 * Função padrão para resposta de erro de não achado
 * @param {Response} res - Variavel de resposta
 * @param {string} message - Menssagem explicando o erro
 */
export function reply_status_404(res: Response, message: string = 'Recurso não achado') {
  res.status(404).send({
    message: message
  })
}

/**
 * Função padrão para resposta de erro de conflito de recursos
 * @param {Response} res - Variavel de resposta
 * @param {string} message - Menssagem explicando o erro
 */
export function reply_status_409(res: Response, message: string = 'Conflito de recursos') {
  res.status(409).send({
    message: message
  })
}
