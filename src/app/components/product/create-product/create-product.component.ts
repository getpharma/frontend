import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector   : 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls  : ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  controls = {
    title         : new FormControl('', [Validators.required]),
    manufacturer  : new FormControl('', [Validators.required]),
    pack_size     : new FormControl('', [Validators.required]),
    composition   : new FormControl(''),
    description   : new FormControl(''),
    category_id   : new FormControl('', [Validators.required]),
    mrp           : new FormControl('', [Validators.required]),
    off_percentage: new FormControl(''),
    off_amount    : new FormControl(''),
    selling_price : new FormControl(''),
    is_trending   : new FormControl(''),
    image         : new FormControl('', [Validators.required]),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  categories;
  trendingBool;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.productService.viewCategories()
      .subscribe(res => {
        this.categories = res;
      });
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
    input.append('title', this.form.get('title').value);
    input.append('manufacturer', this.form.get('manufacturer').value);
    input.append('pack_size', this.form.get('pack_size').value);
    input.append('category_id', this.form.get('category_id').value);
    if (this.form.value.composition) {
      input.append('composition', this.form.get('composition').value);
    }
    if (this.form.value.description) {
      input.append('description', this.form.get('description').value);
    }
    input.append('mrp', this.form.get('mrp').value);
    if (this.form.value.off_percentage) {
      input.append('off_percentage', this.form.get('off_percentage').value);
    } else if (this.form.value.off_amount) {
      input.append('off_amount', this.form.get('off_amount').value);
    } else if (this.form.value.selling_price) {
      input.append('selling_price', this.form.get('selling_price').value);
    }
    input.append('type', 'product');
    input.append('is_trending', this.form.get('is_trending').value);
    input.append('image', this.form.get('image').value);
    return input;
  }

  createProduct() {
    const formModel = this.prepareSave();
    this.loading    = true;
    this.productService.createProduct(formModel)
      .subscribe(res => {
        this.dialogRef.close();
      }, err => {
        alert(err);
      });
  }
}
