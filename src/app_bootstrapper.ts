import {ExtensionBootstrapper} from '@essential-projects/bootstrapper';
import {ExtensionDiscoveryTag as extensionDiscoveryTag} from '@essential-projects/core_contracts';
import {Container, IFactoryAsync, IInstanceWrapper} from 'addict-ioc';
import {ConfigResolver} from './config_resolver';

export class AppBootstrapper {

  private _container: Container<IInstanceWrapper<any>>;
  private extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>;
  private extensionBootstrapper: ExtensionBootstrapper;
  private processEngineConfiguration: any;

  constructor(_container: Container<IInstanceWrapper<any>>,
              extensionBootstrapperFactory: IFactoryAsync<ExtensionBootstrapper>,
              processEngineConfiguration: any) {
    this._container = _container;
    this.extensionBootstrapperFactory = extensionBootstrapperFactory;
    this.processEngineConfiguration = processEngineConfiguration;
  }

  protected get container(): Container<IInstanceWrapper<any>> {
    return this._container;
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
