import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideEventComponent } from './inside-event.component';

describe('InsideEventComponent', () => {
  let component: InsideEventComponent;
  let fixture: ComponentFixture<InsideEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
