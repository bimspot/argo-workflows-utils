import { default as bunyan } from 'bunyan'

const log = bunyan.createLogger({
  name: 'workflow-progress',
  level: 20, // for showing debug logs
})

const stage = (process.env.RELEASE || 'bimspot-local').split(/-(.+)/)[1]

const isStr = (message) =>
  typeof message === 'string' || message instanceof String
const isError = (e) => e instanceof Error

/** bunyan was used wrong with message and object switched
 * also with java logging adding a message field and bunyan a 'msg field
 * I wanted to change that.
 * you can still just pass an error or object as first param
 * and it will treat it as an error
 * @param {function} logFn bunyan logger function bound
 * @param {String|Object} message or error(object is then ignored)
 * @param {Object?} metaOrError
 */
const callBunyan = (logFn, message, metaOrError) => {
  if (isStr(message)) {
    const ctxData = !metaOrError || isError(metaOrError) ? {} : metaOrError
    const jsonAttributes = Object.assign({}, ctxData)
    if (isError(metaOrError)) {
      jsonAttributes.message = message + ' cause: ' + metaOrError.message
      jsonAttributes.stack_trace = metaOrError.stack_trace
    } else {
      jsonAttributes.message = message
    }
    if (metaOrError) {
      logFn(jsonAttributes, message, ctxData)
    } else {
      logFn(jsonAttributes, message)
    }
  } else {
    if (message.message) {
      logFn({ message: message.message }, message)
    } else {
      logFn(message)
    }
  }
}

// eslint-disable-next-line require-jsdoc
class Log {
  /**
   * returns true except when on production branch
   * @return {boolean}
   */
  static sendErrorDetails() {
    return stage !== 'prod'
  }

  // eslint-disable-next-line require-jsdoc
  static info(message, object) {
    callBunyan(log.info.bind(log), message, object)
  }

  // eslint-disable-next-line require-jsdoc
  static debug(message, object) {
    callBunyan(log.debug.bind(log), message, object)
  }

  // eslint-disable-next-line require-jsdoc
  static trace(message, object) {
    callBunyan(log.trace.bind(log), message, object)
  }

  // eslint-disable-next-line require-jsdoc
  static error(message, object) {
    callBunyan(log.error.bind(log), message, object)
  }

  // eslint-disable-next-line require-jsdoc
  static warn(message, object) {
    callBunyan(log.warn.bind(log), message, object)
  }
}

export { Log }
