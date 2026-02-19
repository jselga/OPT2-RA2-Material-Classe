module.exports = (request, response,next) => {
    response.status(404).json({
    ok: false,
    error: 'unknown endpoint'
  })
}