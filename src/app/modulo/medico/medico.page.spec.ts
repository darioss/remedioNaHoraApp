import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MedicoPage} from './medico.page';

describe('MedicoPage', () => {
  let component: MedicoPage;
  let fixture: ComponentFixture<MedicoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
