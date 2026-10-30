import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelephoneList } from './telephone-list';

describe('TelephoneList', () => {
  let component: TelephoneList;
  let fixture: ComponentFixture<TelephoneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelephoneList],
    }).compileComponents();

    fixture = TestBed.createComponent(TelephoneList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
