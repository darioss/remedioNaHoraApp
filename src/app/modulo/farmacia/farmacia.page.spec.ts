import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FarmaciaPage} from './farmacia.page';

describe('FarmaciaPage', () => {
  let component: FarmaciaPage;
  let fixture: ComponentFixture<FarmaciaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmaciaPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmaciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
