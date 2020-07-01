import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../models/product';

@Component({
  selector   : 'app-create-product',
  templateUrl: './update-product.component.html',
  styleUrls  : ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product;

  controls = {
    title         : new FormControl(),
    manufacturer  : new FormControl(),
    pack_size     : new FormControl(),
    composition   : new FormControl(),
    category_id   : new FormControl(),
    mrp           : new FormControl(),
    off_percentage: new FormControl(),
    off_amount    : new FormControl(),
    selling_price : new FormControl(),
    is_trending   : new FormControl(this.data.product.is_trending),
    image         : new FormControl(),
  };

  form    = new FormGroup(this.controls);
  loading = false;
  categories;
  trendingBool;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<UpdateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.product = this.data.product;
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

    if (this.form.value.title) {
      input.append('title', this.form.get('title').value);
    }
    if (this.form.value.manufacturer) {
      input.append('manufacturer', this.form.get('manufacturer').value);
    }
    if (this.form.value.pack_size) {
      input.append('pack_size', this.form.get('pack_size').value);
    }
    if (this.form.value.composition) {
      input.append('composition', this.form.get('composition').value);
    }
    if (this.form.value.category_id) {
      input.append('category_id', this.form.get('category_id').value);
    }
    if (this.form.value.mrp) {
      input.append('mrp', this.form.get('mrp').value);
    }
    if (this.form.value.off_percentage) {
      input.append('off_percentage', this.form.get('off_percentage').value);
    }
    if (this.form.value.off_amount) {
      input.append('off_amount', this.form.get('off_amount').value);
    }
    if (this.form.value.selling_price) {
      input.append('selling_price', this.form.get('selling_price').value);
    }
    if (this.form.value.is_trending) {
      input.append('is_trending', this.form.get('is_trending').value);
    }
    input.append('type', 'product');
    if (this.form.value.image) {
      input.append('image', this.form.get('image').value);
    }
    return input;
  }

  updateProduct() {
    const data   = this.prepareSave();
    this.loading = true;
    this.productService.updateProduct(this.data.product.id, data)
      .subscribe(res => {
        this.dialogRef.close(res);

      }, err => {
        alert(err);
      });
  }
}
