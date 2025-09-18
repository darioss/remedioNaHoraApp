import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CuidadorPage} from './cuidador.page';

describe('CuidadorPage', () => {
  let component: CuidadorPage;
  let fixture: ComponentFixture<CuidadorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuidadorPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CuidadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
