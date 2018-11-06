import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSATComponent } from './builder-sat.component';

describe('BuilderSATComponent', () => {
  let component: BuilderSATComponent;
  let fixture: ComponentFixture<BuilderSATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderSATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
