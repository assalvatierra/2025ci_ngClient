import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sampleapi',
  standalone: false,
  templateUrl: './sampleapi.component.html',
  styleUrl: './sampleapi.component.css'
})
export class SampleapiComponent {

  SampleApiResult: string = '';

  constructor(private http: HttpClient) {}

  sampleHttpGet() {
    this.SampleApiResult = 'Loading...';

    this.http.get('http://localhost:5131/weatherforecast', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.SampleApiResult = data;
        },
        error: (error) => {
          console.error('Error calling API:', error);
          let errorMessage = 'Error occurred while calling the API';

          if (error.status === 0) {
            errorMessage = 'Cannot connect to API server. Make sure the server is running on http://localhost:5131';
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
}
