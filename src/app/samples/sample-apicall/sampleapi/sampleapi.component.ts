import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-sampleapi',
  standalone: false,
  templateUrl: './sampleapi.component.html',
  styleUrl: './sampleapi.component.css'
})
export class SampleapiComponent {

  SampleApiResult: string = '';

  constructor(private http: HttpClient, public configService: ConfigService) {}

  sampleHttpGet() {
    this.SampleApiResult = `Trying to call API: ${this.configService.apiUrl}/weatherforecast`;

    this.http.get(`${this.configService.apiUrl}/weatherforecast`, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.SampleApiResult = data;
        },
        error: (error) => {
          console.error('Error calling API:', error);
          console.error('Full error object:', JSON.stringify(error, null, 2));
          let errorMessage = 'Error occurred while calling the API';

          if (error.status === 0) {
            errorMessage = `Cannot connect to API server. Make sure the server is running on ${this.configService.apiUrl}\n\nDebugging info:\n- Check if API container is running\n- Verify network connectivity\n- Check API server logs`;
          } else if (error.status === 404) {
            errorMessage = 'API endpoint not found (404). Check if /weatherforecast endpoint exists.';
          } else if (error.status >= 500) {
            errorMessage = `Server error (${error.status}): ${error.message}`;
          } else {
            errorMessage = `HTTP Error ${error.status}: ${error.message}`;
          }

          this.SampleApiResult = errorMessage;
        }
      });
  }

  testConnectivity() {
    this.SampleApiResult = 'Testing connectivity...';

    // Simple ping test to the base URL
    this.http.get(`${this.configService.apiUrl}/Api/Database/`, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.SampleApiResult = `✅ Server is reachable at ${this.configService.apiUrl}\nResponse: ${data}`;
        },
        error: (error) => {
          console.error('Connectivity test failed:', error);
          this.SampleApiResult = `❌ Cannot reach server at ${this.configService.apiUrl}\nError: ${error.status || 'Network error'}\nMessage: ${error.message || 'Unknown error'}`;
        }
      });
  }


  testDatabase() {
    this.SampleApiResult = 'Testing connectivity...';

    // Simple ping test to the base URL
    this.http.post(`${this.configService.apiUrl}/Api/Database/`, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.SampleApiResult = `✅ Server is reachable at ${this.configService.apiUrl}\nResponse: ${data}`;
        },
        error: (error) => {
          console.error('Connectivity test failed:', error);
          this.SampleApiResult = `❌ Cannot reach server at ${this.configService.apiUrl}\nError: ${error.status || 'Network error'}\nMessage: ${error.message || 'Unknown error'}`;
        }
      });
  }


}
