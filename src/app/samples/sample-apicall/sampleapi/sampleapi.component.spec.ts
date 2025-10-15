import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleapiComponent } from './sampleapi.component';

describe('SampleapiComponent', () => {
  let component: SampleapiComponent;
  let fixture: ComponentFixture<SampleapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleapiComponent]
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
