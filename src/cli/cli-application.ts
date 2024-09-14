import { ICommand } from './commands/command.interface.js';

import { CommandParser } from './command-parser.js';
import chalk from 'chalk';


type CommandCollection = Record<string, ICommand>;


export class CLIApplication {
  private commands: CommandCollection = {};

  constructor (
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandList: ICommand[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`${chalk.red.bold('ERROR')} | Комнда ${chalk.red(command.getName())} уже зарегистрирована`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getDefaultCommand(): ICommand | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`${chalk.red.bold('ERROR')} | Команда обозначеннная как дефолтная ${(chalk.gray.italic(`(${this.defaultCommand})`))} is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.commands[commandName] ?? this.getDefaultCommand();
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
