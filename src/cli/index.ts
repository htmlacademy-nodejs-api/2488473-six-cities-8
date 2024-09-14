#!/usr/bin/env node

import { CLIApplication } from './cli-application.js';

import { HelpCommand } from './commands/help.command.js';
import { VersionCommand } from './commands/version.command.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new VersionCommand(),
    new HelpCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
