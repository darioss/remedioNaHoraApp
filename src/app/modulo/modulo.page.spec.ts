import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ModuloPage } from './modulo.page';

describe('ModuloPage', () => {
  let component: ModuloPage;
  let fixture: ComponentFixture<ModuloPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
