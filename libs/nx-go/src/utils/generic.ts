import { ExecutorContext } from '@nrwl/devkit';
import { ExecException } from 'child_process';

/**
 * `projectFromContext` takes an `ExecutorContext` object and returns the
 * `ProjectConfiguration` for the project targeted.
 */
export function projectFromContext(context: ExecutorContext) {
  return context.workspace.projects[context.projectName];
}

/**
 * `defaultExecHandler` just logs any output from running the command passed
 * to `exec`.
 */
export function defaultExecHandler(
  error: ExecException,
  stdout: string,
  stderr: string
) {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}
