import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector   : 'app-create-candidate',
  templateUrl: './create-category.component.html',
  styleUrls  : ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  controls = {
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required])
  };

  form = new FormGroup(this.controls);
  loading: boolean;

  constructor(private productService: ProductService,
              private dialogRef: MatDialogRef<CreateCategoryComponent>,
              private router: Router) {
  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('title', this.form.get('title').value);
    input.append('type', 'category');
    input.append('image', this.form.get('image').value);
    return input;
  }

  createCategory() {

    if (this.form.invalid) {
      console.log('hii');
    }

    const data = this.prepareSave();

    this.productService.addCategory(data)
      .subscribe(res => {
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }


}
