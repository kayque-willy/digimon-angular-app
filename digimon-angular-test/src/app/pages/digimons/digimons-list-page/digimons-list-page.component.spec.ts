import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonsListPageComponent } from './digimons-list-page.component';

describe('DigimonsListPageComponent', () => {
  let component: DigimonsListPageComponent;
  let fixture: ComponentFixture<DigimonsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigimonsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigimonsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
