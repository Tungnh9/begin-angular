import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TodoDetail } from './todo-detail';

describe('TodoDetail', () => {
  let component: TodoDetail;
  let fixture: ComponentFixture<TodoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetail);
    fixture.componentRef.setInput('id', '1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
