import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUrlsComponent } from './listado-urls.component';

describe('ListadoUrlsComponent', () => {
  let component: ListadoUrlsComponent;
  let fixture: ComponentFixture<ListadoUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoUrlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

