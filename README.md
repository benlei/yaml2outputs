# benlei/yaml2outputs

[![GitHub Super-Linter](https://github.com/benlei/yaml2outputs/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/benlei/yaml2outputs/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/benlei/yaml2outputs/actions/workflows/check-dist.yml/badge.svg)](https://github.com/benlei/yaml2outputs/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/benlei/yaml2outputs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/benlei/yaml2outputs/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Reads in a `yaml` input (or `file` input) and tries to output its values in dot
notation. Note that if the YAML/file is a primitive/missing/has errors, nothing
will be output.

For example given the YAML:

```yaml
foo:
  bar:
    - 1
    - 2
    - 3
hello:
  world: abc
  example.com/foobar: bye
  'yes': true
  'no': false
```

Should output the following:

- `steps.my-id.outputs['foo.bar[0]'] = '1'`
- `steps.my-id.outputs['foo.bar[1]'] = '2'`
- `steps.my-id.outputs['foo.bar[2]'] = '3'`
- `steps.my-id.outputs['hello.world'] = 'abc'`
- `steps.my-id.outputs['hello["example.com/foobar"]'] = 'bye'`
- `steps.my-id.outputs['hello.yes'] = 'true'`
- `steps.my-id.outputs['hello.no'] = 'false'`

## Inputs

<!-- markdownlint-disable MD013 -->

| Input Name | Required | Default | Description                                                      |
| ---------- | -------- | ------- | ---------------------------------------------------------------- |
| `yaml`     | no       | `''`    | The YAML body (string) to parse                                  |
| `file`     | no       | `''`    | The YAML file to parse. Ignored if `yaml` has a non-empty value. |

<!-- markdownlint-enable MD013 -->

## Outputs

Varies depending on inputs.

## Example

### Passing in a raw YAML body

```yaml
- name: Test
  id: yaml
  uses: benlei/yaml2outputs@v1
  with:
    yaml: |
      foo:
        bar:
          - 1
          - 2
          - 3
      hello:
        world: abc
        example.com/foobar: bye
        'yes': true
        'no': false

- name: Output value:
  run: |
    echo ${{ steps.yaml.outputs['hello["example.com/foobar"]'] }}
```

### Passing in a YAML file

```yaml
- name: Test
  id: yaml
  uses: benlei/yaml2outputs@v1
  with:
    file: ./some.yaml

- name: Output value:
  run: |
    echo ${{ steps.yaml.outputs['hello["example.com/foobar"]'] }}
```
