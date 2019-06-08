import { AppMaterialModuleModule } from './app-material-module.module';

describe('AppMaterialModuleModule', () => {
  let appMaterialModuleModule: AppMaterialModuleModule;

  beforeEach(() => {
    appMaterialModuleModule = new AppMaterialModuleModule();
  });

  it('should create an instance', () => {
    expect(appMaterialModuleModule).toBeTruthy();
  });
});
