import { readFileSync } from 'node:fs';
import { ICommand } from './command.interface.js';
import { resolve } from 'node:path';
import chalk from 'chalk';


type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null && // type guard
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements ICommand {
  constructor (
    private readonly filePath: string = 'package.json'
  ) {}

  getName() {
    return '--version';
  }

  private readVersion (): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error(`${chalk.red.bold('ERROR')} | Невозможно распарсить файл ${chalk.italic.gray('он не является NPM файлом')}`);
    }

    return importedContent.version;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`${chalk.red.bold('ERROR')} Не удалось прочитать версию в: ${chalk.red(this.filePath)}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
