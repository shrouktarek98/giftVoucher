import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyesShowComponent } from './companyes-show.component';

describe('CompanyesShowComponent', () => {
  let component: CompanyesShowComponent;
  let fixture: ComponentFixture<CompanyesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
