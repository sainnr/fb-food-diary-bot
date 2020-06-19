module.exports = (req, res) => {
  const VERIFICATION_TOKEN = 'iwannabesedated'

  const hubChallenge = req.query['hub.challenge']
  const hubMode = req.query['hub.mode']
  const verifyTokenMatches = (req.query['hub.verify_token'] === VERIFICATION_TOKEN)

  if (hubMode && verifyTokenMatches) {
    console.log('Webhook verified')
    res.status(200).send(hubChallenge)
  } else {
    res.status(403).end()
  }
}