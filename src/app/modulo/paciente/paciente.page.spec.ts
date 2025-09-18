import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PacientePage } from './paciente.page';

describe('PacientePage', () => {
  let component: PacientePage;
  let fixture: ComponentFixture<PacientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientePage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
