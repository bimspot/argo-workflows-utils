import {default as jwt} from 'jsonwebtoken'

/**
 * Returns the payload as an object.
 * @return {Object}
 * @throws Throws an error if the payload is missing or is not valid JSON.
 */
const payload = () => {
  if (!process.env.PAYLOAD) {
    throw Error('The environment variable "PAYLOAD" is missing.')
  }
  try {
    return JSON.parse(process.env.PAYLOAD)
  } catch (e) {
    throw Error('Payload is not a valid json')
  }
}

/**
 * Returns the secret for the JSON signing.
 * @return {string}
 * @throws Throws an error if the secret is missing from the environment.
 */
const secret = () => {
  if (!process.env.SECRET) {
    throw Error('The environment variable "SECRET" is missing.')
  }
  return process.env.SECRET
}

/**
 * Returns the options for the JWT signing.
 * @return {null|Object}
 * @throws Throws an error if options is not valid JSON.
 */
const options = () => {
  if (!process.env.OPTIONS) {
    return null
  }
  try {
    return JSON.parse(process.env.OPTIONS)
  } catch (e) {
    throw Error('Options is not a valid json')
  }
}

try {
  const token = jwt.sign(payload(), secret(), options(), null)
  console.log(token)
} catch (e) {
  console.error(e.message)
  process.exit(9)
}
