import escape from 'escape-html'
import * as compiler from './compiler'
import html, { renderHTML } from './render-html'
import type { ClaritySource, CompiledModule } from './types'
import { parseModule, parseTextTemplate, strictParser } from './parser'
import { clarityEval } from './clarity-eval'

export { render } from './render'
export { buildClassAttr, classAttr } from './render-html'
export { renderHTML }

export const globalEnv = {
  ...html,
  debug: (opts: {content: string}) => {
    try {
      return escape(JSON.stringify(opts.content, null, 2))
    } catch (e) {
      return escape(String(opts.content))
    }
  }
}

export function genFiles(src: ClaritySource, buildMode: 'build' | 'watch') {
  globalEnv.$buildMode = buildMode
  return buildModule(src).$render?.(renderHTML, 'files')
}

export function gen(src: ClaritySource, opts:{textTemplate?: boolean}={}) {
  return buildModule(src, {textTemplate: opts.textTemplate}).$render?.(renderHTML)
}

export function buildModule(src: ClaritySource, options: compiler.CompileModuleOpts = {}): CompiledModule {
  if (src) {
    const {textTemplate, ...opts} = options
    const module = textTemplate ? parseTextTemplate(src as string, strictParser) : parseModule(src, strictParser)
    const js = compiler.compileModule(module, opts)
    return clarityEval(js)
  }
  return {}
}
