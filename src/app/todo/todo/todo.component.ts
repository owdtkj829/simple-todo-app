import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

interface TodoItem {
  title: string;
  description: string;
  isComplete: boolean;
  date: any;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  //詳細が表示されているか
  public hasDetail = false;

  //アイテムリスト
  public itemList: Array<TodoItem> = new Array<TodoItem>();

  //入力フォーム
  public todoForm: FormGroup;

  constructor(
    protected formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    //Formの作成と初期値設定
    this.todoForm = this.formBuilder.group({
      //初期値空欄でバリデーション設定
      title: [
        '', [
          Validators.required
        ]
      ],
      //初期値空欄
      description: [''],
      //初期値空欄
      date: [''],
      //完了しているか。初期値は未完了。
      isComplete: [false]
    });
  }

  //TodoItemを保存するメソッド
  onSaveTodoItem(): void {
    const item: TodoItem = {
      title: this.todoForm.get('title').value,
      description: null,
      isComplete: false,
      date: null
    };

    if (this.hasDetail) {
      item.description = this.todoForm.get('description').value,
        item.date = this.todoForm.get('date').value
    }

    this.itemList.push(item);
    this.clearForm();
    console.log(this.itemList);
  }

  //フォームの値をリセット
  clearForm(): void {
    this.todoForm.reset();
  }

  //指定した要素を削除
  onDeleteItem(index: number): void {
    this.itemList.splice(index, 1);
  }
}
