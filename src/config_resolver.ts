import {IInstanceWrapper, Resolver} from 'addict-ioc';

export class ConfigResolver extends Resolver<any, IInstanceWrapper<any>> {

  private processEngineConfiguration: any;

  public constructor(processEngineConfiguration: any) {
    super();
    this.processEngineConfiguration = processEngineConfiguration;
  }

  public resolveConfig(configNamespace: Function | {} | string): any {
    const configType: string = typeof configNamespace;

    if (configType === 'undefined') {
      return undefined;
    }

    if (configType === 'object') {
      return configNamespace;
    }

    if (configType === 'function') {
      return (configNamespace as Function)();
    }

    const segments: Array<string> = (configNamespace as string).split(':');
    let currentNode: any = this.processEngineConfiguration;

    for (const segment of segments) {
      currentNode = currentNode[segment];
      if (currentNode === undefined || currentNode === null) {
        return undefined;
      }
    }

    return currentNode;
  }
}
