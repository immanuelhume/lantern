import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('application e2e', () => {
  it('should create application', async () => {
    const plugin = uniq('nx-go');
    ensureNxProject('@lantern/nx-go', 'dist/libs/nx-go');
    await runNxCommandAsync(`generate @lantern/nx-go:app ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create main.go file in the specified directory', async () => {
      const plugin = uniq('nx-go');
      ensureNxProject('@lantern/nx-go', 'dist/libs/nx-go');
      await runNxCommandAsync(
        `generate @lantern/nx-go:application ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/main.go`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('nx-go');
      ensureNxProject('@lantern/nx-go', 'dist/libs/nx-go');
      await runNxCommandAsync(
        `generate @lantern/nx-go:application ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});

describe('library e2e', () => {
  it('should create library', async () => {
    const plugin = uniq('nx-go');
    ensureNxProject('@lantern/nx-go', 'dist/libs/nx-go');
    await runNxCommandAsync(`generate @lantern/nx-go:lib ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create main.go in the specified directory', async () => {
      const plugin = uniq('nx-go');
      ensureNxProject('@lantern/nx-go', 'dist/libs/nx-go');
      await runNxCommandAsync(
        `generate @lantern/nx-go:application ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/main.go`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('nx-go');
      ensureNxProject('@lantern/nx-go', 'dist/libs/nx-go');
      await runNxCommandAsync(
        `generate @lantern/nx-go:application ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
