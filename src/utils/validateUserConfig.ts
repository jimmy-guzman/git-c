// TODO: find alternative to ajv since package is quite big
import Ajv from 'ajv'

import schema from './schema.json'

const getErrorMessage = (errors: Ajv.ErrorObject[]): string => {
  const ERROR_TYPE = '[Customization]'

  return errors.map(error => {
    if (error.keyword === 'additionalProperties') {
      return `${ERROR_TYPE} ${error.message}`
    }
    if (error.keyword === 'type') {
      return `${ERROR_TYPE} "${error.dataPath.replace(/\./g, '')}" ${
        error.message
      }`
    }

    return `${ERROR_TYPE} ${JSON.stringify(error)}`
  })[0]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateUserConfig = async (userConfig: unknown): Promise<any> => {
  const ajv = new Ajv()
  const valid = await ajv.validate(schema, userConfig)

  if (!valid) {
    if (ajv.errors) {
      throw new Error(getErrorMessage(ajv.errors))
    }
  }

  return valid
}
