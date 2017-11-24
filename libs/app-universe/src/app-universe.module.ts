import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';;
import { HeaderComponent } from './components/header/header.component';
import { UniverseComponent } from './components/universe/universe.component';
import { TrackScrollDirective } from './directives/track-scroll.directive';
import { ConfigLoader, ConfigStaticLoader } from '@ngx-config/core';
import { ConfigService, ConfigModule } from '@ngx-config/core';
import { UniverseConfig } from './model/universe.config';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule,   MatCardModule, MatSidenavModule, MatMenuModule, MatButtonModule  } from '@angular/material';

export interface IConfigValue {
    json: any
}

export class ConfigValue implements IConfigValue {
    json: any;
}

export function configLoaderFactory(configValue: ConfigValue): ConfigLoader {
  const config = new ConfigStaticLoader(configValue.json);
  return config;
}
export function configLoaderFactorySettings(_configService: ConfigService): UniverseConfig {
  return <UniverseConfig>_configService.getSettings();
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild([]),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: configLoaderFactory,
      deps: [ConfigValue]
    })
  ],
  declarations: [HeaderComponent, UniverseComponent, TrackScrollDirective, NavigationComponent],
  exports: [UniverseComponent],
  providers: [
    {
      provide: UniverseConfig,
      useFactory: configLoaderFactorySettings,
      deps: [ConfigService]
    }
  ],
  bootstrap: []
})
export class AppUniverseModule {
  
  static fromConfig(config: IConfigValue): ModuleWithProviders {
    return {
      ngModule: AppUniverseModule,
      providers: [
          {
              provide: ConfigValue,
              useValue: config
          }
      ]
    };
  }
}
