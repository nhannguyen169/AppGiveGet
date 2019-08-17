import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPostPage } from './item-post.page';

describe('ItemPostPage', () => {
  let component: ItemPostPage;
  let fixture: ComponentFixture<ItemPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
