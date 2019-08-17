import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGiveDetailPage } from './list-give-detail.page';

describe('ListGiveDetailPage', () => {
  let component: ListGiveDetailPage;
  let fixture: ComponentFixture<ListGiveDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGiveDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGiveDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
