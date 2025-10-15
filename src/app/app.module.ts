import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponentComponent } from './samples/welcome-component/welcome-component.component';
import { SampleapiComponent } from './samples/sample-apicall/sampleapi/sampleapi.component';
import { ConfigService } from './services/config.service';
import { initializeApp } from './services/app-initializer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponentComponent,
    SampleapiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
