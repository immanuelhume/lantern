import { ExecutorContext } from '@nrwl/devkit';
import { runGoCommand } from '../../utils/go-utils';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  runGoCommand(context, 'build');
  return { success: true };
}
