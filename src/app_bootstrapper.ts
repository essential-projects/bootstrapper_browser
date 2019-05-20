import {ExtensionBootstrapper} from '@essential-projects/bootstrapper';
import {extensionDiscoveryTag} from '@essential-projects/bootstrapper_contracts';
import {Container, IFactoryAsync, IInstanceWrapper} from 'addict-ioc';
import {ConfigResolver} from './config_resolver';

export class AppBootstrapper {

  protected container: Container<IInstanceWrapper<any>>;

  private extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>;
  private extensionBootstrapper: ExtensionBootstrapper;
  private processEngineConfiguration: any;

  constructor(
    _container: Container<IInstanceWrapper<any>>,
    extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>,
    processEngineConfiguration: any,
  ) {
    this.container = _container;
    this.extensionBootstrapperFactory = extensionBootstrapperFactory;
    this.processEngineConfiguration = processEngineConfiguration;
  }

  private initializeConfigProvider(): void {
    this.container.settings.resolver = new ConfigResolver(this.processEngineConfiguration);
  }

  public async initialize(): Promise<void> {
    this.extensionBootstrapper = await this.extensionBootstrapperFactory([extensionDiscoveryTag]);

    this.initializeConfigProvider();
  }

  public start(): Promise<void> {
    return this.extensionBootstrapper.start();
  }

}
