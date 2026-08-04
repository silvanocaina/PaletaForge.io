/**
 * Função padrão para resposta de erro generico no lado do servidor
 * @param {*} res - Variavel de resposta
 */
export function reply_status_500(res) {
  res.status(500).send('Erro no servidor')
}
