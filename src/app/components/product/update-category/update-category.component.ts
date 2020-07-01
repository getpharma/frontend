import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { ProductCategory } from '../../../models/product';

@Component({
  selector   : 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls  : ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category: ProductCategory;

  controls = {
    title: new FormControl(null),
    image: new FormControl(null)
  };

  form = new FormGroup(this.controls);

  constructor(private productService: ProductService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.category = this.data.category;
    console.log(this.category);
  }

  close() {
    this.dialogRef.close();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    if (this.form.value.title) {
      input.append('title', this.form.get('title').value);
    }
    input.append('type', 'category');
    if (this.form.value.image) {
      input.append('image', this.form.get('image').value);
    }
    return input;
  }

  updateCategory() {
    const input = this.prepareSave();
    this.productService.updateCategory(this.category.id, input)
      .subscribe(res => {
        this.dialogRef.close();
      });

  }

}
