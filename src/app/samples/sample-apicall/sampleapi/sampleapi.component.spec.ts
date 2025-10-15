import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SampleapiComponent } from './sampleapi.component';
import { ConfigService } from '../../../services/config.service';

describe('SampleapiComponent', () => {
  let component: SampleapiComponent;
  let fixture: ComponentFixture<SampleapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SampleapiComponent],
      providers: [ConfigService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
