import * as core from '@actions/core'
import { parse } from 'yaml'
import { Anything } from './types'
import { readFileSync } from './file'

export const yamlInput = (): string =>
  core.getInput('yaml', {
    required: false,
    trimWhitespace: true
  })

export const fileInput = (): string =>
  core.getInput('file', {
    required: false,
    trimWhitespace: true
  })

export const getYAMLFromInputs = (): Anything => {
  const yaml = yamlInput()
  const file = fileInput()
  try {
    if (yaml) {
      return parse(yaml)
    } else if (file) {
      return parse(readFileSync(file))
    } else {
      return {}
    }
  } catch (error) {
    core.warning(`Couldn't parse YAML: ${error}`)
    return {}
  }
}
