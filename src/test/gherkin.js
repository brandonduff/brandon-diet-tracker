import { describe, it } from 'vitest'
import fs from 'node:fs'

const stepDefs = []

export function Given(pattern, fn) { stepDefs.push({ pattern, fn }) }
export function When(pattern, fn) { stepDefs.push({ pattern, fn }) }
export function Then(pattern, fn) { stepDefs.push({ pattern, fn }) }
export { Given as And }

function matchStep(text) {
  for (const def of stepDefs) {
    if (typeof def.pattern === 'string') {
      if (def.pattern === text) return { fn: def.fn, args: [] }
    } else {
      const match = text.match(def.pattern)
      if (match) return { fn: def.fn, args: match.slice(1) }
    }
  }
  return null
}

function parseFeatureFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').map((l) => l.trim()).filter(Boolean)

  let featureName = ''
  const scenarios = []
  let current = null

  for (const line of lines) {
    if (line.startsWith('Feature:')) {
      featureName = line.slice('Feature:'.length).trim()
    } else if (line.startsWith('Scenario:')) {
      current = { name: line.slice('Scenario:'.length).trim(), steps: [] }
      scenarios.push(current)
    } else if (/^(Given|When|Then|And|But)\s/.test(line)) {
      const text = line.replace(/^(Given|When|Then|And|But)\s+/, '')
      current?.steps.push(text)
    }
  }

  return { featureName, scenarios }
}

export function feature(filePath) {
  const { featureName, scenarios } = parseFeatureFile(filePath)

  describe(featureName, () => {
    for (const scenario of scenarios) {
      it(scenario.name, async () => {
        for (const stepText of scenario.steps) {
          const match = matchStep(stepText)
          if (!match) {
            throw new Error(`No step definition for: "${stepText}"`)
          }
          await match.fn(...match.args)
        }
      })
    }
  })
}
