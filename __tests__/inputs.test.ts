import * as inputs from '../src/inputs'
import * as file from '../src/file'
import { getYAMLFromInputs } from '../src/inputs'

describe('getYAMLFromInputs', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    jest.spyOn(inputs, 'yamlInput').mockReturnValue('')
    jest.spyOn(inputs, 'fileInput').mockReturnValue('')
  })

  it('should not throw an error if an error occurs', () => {
    jest.spyOn(inputs, 'yamlInput').mockReturnValue('')
    expect(getYAMLFromInputs()).toStrictEqual({})
  })

  it('should return an object if the body input is valid', () => {
    jest.spyOn(inputs, 'yamlInput').mockReturnValue('a: 1')
    expect(getYAMLFromInputs()).toStrictEqual({ a: 1 })
  })

  it('return an array if the body input is valid', () => {
    jest.spyOn(inputs, 'yamlInput').mockReturnValue('- 1\n- 2\n- 3')
    expect(getYAMLFromInputs()).toStrictEqual([1, 2, 3])
  })

  it('should return an object if the file input is valid', () => {
    jest.spyOn(inputs, 'fileInput').mockReturnValue('file.yaml')
    jest.spyOn(file, 'readFileSync').mockReturnValue('a: 1')
    expect(getYAMLFromInputs()).toStrictEqual({ a: 1 })
  })

  it('should return an array if the file input is valid', () => {
    jest.spyOn(inputs, 'fileInput').mockReturnValue('file.yaml')
    jest.spyOn(file, 'readFileSync').mockReturnValue('- 1\n- 2\n- 3')
    expect(getYAMLFromInputs()).toStrictEqual([1, 2, 3])
  })

  it('should return an empty object if the file input is invalid', () => {
    jest.spyOn(inputs, 'fileInput').mockReturnValue('file.yaml')
    jest.spyOn(file, 'readFileSync').mockImplementation(() => {
      throw new Error()
    })
    expect(getYAMLFromInputs()).toStrictEqual({})
  })

  it('should return a primitive if input results is a primitive', () => {
    jest.spyOn(inputs, 'yamlInput').mockReturnValue('"a"')
    expect(getYAMLFromInputs()).toStrictEqual('a')
  })
})
