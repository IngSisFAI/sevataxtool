import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSATComponent } from './document-sat.component';

describe('DocumentSATComponent', () => {
  let component: DocumentSATComponent;
  let fixture: ComponentFixture<DocumentSATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
