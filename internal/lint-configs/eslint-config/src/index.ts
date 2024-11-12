import type { Linter } from 'eslint';
import type { Config as TsFlagConfig } from 'typescript-eslint';

import { ignores, prettier, vue, typescript } from './configs';

type FlatConfig = Linter.Config;

type FlatConfigPromise = FlatConfig[] | Promise<FlatConfig[]> | TsFlagConfig;

/**
 *
 * @param config eslint 自定义配置
 * @returns
 */
async function defineConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromise[] = [
    // 自定义配置
    ignores(),
    vue(),
    typescript(),
    prettier(),
    config,
  ];

  const resolvedConfig = await Promise.all(configs);
  return resolvedConfig.flat(Infinity);
}

export { defineConfig };
