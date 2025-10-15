import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface AppConfig {
  apiUrl: string;
  appName: string;
  production: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = environment;

  constructor(private http: HttpClient) {}

  /**
   * Load configuration from assets/config.json (for Docker runtime config)
   * Falls back to environment.ts if config.json is not available
   */
  async loadConfig(): Promise<AppConfig> {
    try {
      // Try to load runtime configuration from assets/config.json
      const runtimeConfig = await this.http.get<AppConfig>('/assets/config.json').toPromise();
      if (runtimeConfig) {
        this.config = { ...environment, ...runtimeConfig };
      }
    } catch (error) {
      console.warn('Could not load runtime config, using default environment config:', error);
      // Use default environment config
      this.config = environment;
    }

    return this.config;
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get appName(): string {
    return this.config.appName;
  }

  get isProduction(): boolean {
    return this.config.production;
  }

  get allConfig(): AppConfig {
    return { ...this.config };
  }
}