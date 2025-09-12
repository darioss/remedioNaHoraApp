import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TestePage} from './teste.page';

describe('TestePage', () => {
  let component: TestePage;
  let fixture: ComponentFixture<TestePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestePage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TestePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
