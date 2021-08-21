import {
  ExecutorContext,
  ProjectConfiguration,
  WorkspaceJsonConfiguration,
} from '@nrwl/devkit';
import { exec } from 'child_process';
import * as path from 'path';
import { defaultExecHandler, projectFromContext } from './generic';

type goAction = 'build' | 'test' | 'serve';
interface GoCommandOptions {
  projectName: string;
  project: ProjectConfiguration;
  workspace: WorkspaceJsonConfiguration;
  workspaceRoot: string;
}

export function runGoCommand(
  context: ExecutorContext,
  action: goAction
): { success: boolean } {
  const options: GoCommandOptions = {
    projectName: context.projectName,
    project: projectFromContext(context),
    workspace: context.workspace,
    workspaceRoot: context.root,
  };

  switch (action) {
    case 'build':
      return goBuild(options);
    case 'test':
      return goTest(options);
    case 'serve':
      return goServe(options);
    default:
      console.error('Invalid action - can only build/test/serve.');
      return { success: false };
  }
}

function goBuild(options: GoCommandOptions) {
  const binPath = path.join(options.workspaceRoot, 'dist', options.projectName);
  const toExec = `go build -o ${binPath}`;
  exec(toExec, { cwd: options.project.root }, defaultExecHandler);
  return { success: true };
}

function goTest(options: GoCommandOptions) {
  const toExec = 'go test';
  exec(toExec, { cwd: options.project.root }, defaultExecHandler);
  return { success: true };
}

function goServe(options: GoCommandOptions) {
  const toExec = 'go run *';
  exec(toExec, { cwd: options.project.root }, defaultExecHandler);
  return { success: true };
}
