import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory, Product, ProductCategory, Sale, Stock, WholesalerProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { CreateWholesalerProductComponent } from './create-wholesaler-product/create-wholesaler-product.component';
import { UpdateWholesalerProductComponent } from './update-wholesaler-product/update-wholesaler-product.component';
import { CreateStockComponent } from './create-stock/create-stock.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector   : 'app-product',
  templateUrl: './product.component.html',
  styleUrls  : ['./product.component.css']
})
export class ProductComponent implements OnInit {

  searchInput                             = '';
  searchedProducts: Product[]             = [];
  products: Product[]                     = [];
  stocks: Stock[]                         = [];
  inventory: Inventory[]                  = [];
  sale: Sale[]                            = [];
  categories: ProductCategory[]           = [];
  wholesalerProducts: WholesalerProduct[] = [];
  headings                                = ['head-cat', 'head-prod', 'head-stock', 'head-inv', 'head-sale'];
  currentProduct: Product                 = null;
  currentProductTitle                     = null;
  currentProductManufacturer              = null;

  limit        = 100;
  offset       = 0;
  productCount = 0;
  totalPages   = 1;
  currentPage  = 1;

  controls = {
    query: new FormControl(),
  };

  form = new FormGroup(this.controls);


  constructor(private productService: ProductService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit() {
    this.underline('head-cat');
    this.controls.query.valueChanges
      .pipe(
        filter(query => query),
        distinctUntilChanged(),
        debounceTime(500)
      ).subscribe(value => this.searchProducts(value));
  }

  underline(element: string) {
    for (let i = 0; i < 5; i++) {
      if (this.headings[i] !== element) {
        document.getElementById(this.headings[i]).classList.replace('active-heading', 'inactive-heading');
      } else {
        document.getElementById(this.headings[i]).classList.replace('inactive-heading', 'active-heading');
      }
    }
    if (element === 'head-cat') {
      this.productService.viewCategories()
        .subscribe(res => {
          this.categories = res;
        });
      document.getElementById('table-cat').style.display   = 'block';
      document.getElementById('table-prod').style.display  = 'none';
      document.getElementById('table-deal').style.display  = 'none';
      document.getElementById('table-stock').style.display = 'none';
      document.getElementById('table-inv').style.display   = 'none';
      document.getElementById('table-sale').style.display  = 'none';
    } else if (element === 'head-prod') {
      this.productService.countProducts()
        .subscribe(res => {
          this.productCount = res.count;
          console.log(res);
          console.log(this.productCount);
          this.totalPages = Math.ceil(this.productCount / this.limit);
        });
      this.productService.viewProducts(this.limit, this.offset)
        .subscribe(res => {
          this.products = res;
        });
      document.getElementById('table-cat').style.display   = 'none';
      document.getElementById('table-prod').style.display  = 'block';
      document.getElementById('table-deal').style.display  = 'none';
      document.getElementById('table-stock').style.display = 'none';
      document.getElementById('table-inv').style.display   = 'none';
      document.getElementById('table-sale').style.display  = 'none';
    } else if (element === 'head-stock') {
      this.productService.viewStocks()
        .subscribe(res => {
          this.stocks = res;
        });
      document.getElementById('table-cat').style.display   = 'none';
      document.getElementById('table-prod').style.display  = 'none';
      document.getElementById('table-deal').style.display  = 'none';
      document.getElementById('table-stock').style.display = 'block';
      document.getElementById('table-inv').style.display   = 'none';
      document.getElementById('table-sale').style.display  = 'none';
    } else if (element === 'head-inv') {
      this.productService.viewInventory()
        .subscribe(res => {
          this.inventory = res;
        });
      document.getElementById('table-cat').style.display   = 'none';
      document.getElementById('table-prod').style.display  = 'none';
      document.getElementById('table-deal').style.display  = 'none';
      document.getElementById('table-stock').style.display = 'none';
      document.getElementById('table-inv').style.display   = 'block';
      document.getElementById('table-sale').style.display  = 'none';
    } else if (element === 'head-sale') {
      this.productService.productCount()
        .subscribe(res => {
          this.sale = res;
          console.log(res);
        });
      document.getElementById('table-cat').style.display   = 'none';
      document.getElementById('table-prod').style.display  = 'none';
      document.getElementById('table-deal').style.display  = 'none';
      document.getElementById('table-stock').style.display = 'none';
      document.getElementById('table-inv').style.display   = 'none';
      document.getElementById('table-sale').style.display  = 'block';
    }
  }

  nextPage() {
    if ((this.currentPage + 1) !== this.totalPages) {
      if (this.currentPage === this.totalPages) {
        document.getElementById('next').style.color = 'grey';
      }else {
        document.getElementById('next').style.color = '#00BFFF';
      }
      document.getElementById('previous').style.color = '#00BFFF';
      this.offset = this.currentPage * this.limit;
      this.currentPage += 1;
      this.productService.viewProducts(this.limit, this.offset)
        .subscribe(res => {
          this.products = res;
          console.log(this.offset);
          console.log(this.limit);
        });
    } else {
      document.getElementById('next').style.color = 'grey';
    }
  }

  previousPage() {
    if ((this.currentPage - 1) === 0) {
      document.getElementById('previous').style.color = 'grey';
    } else {
      this.currentPage -= 1;
      console.log(this.currentPage);
      if (this.currentPage === 1) {
        document.getElementById('previous').style.color = 'grey';
      } else {
        document.getElementById('previous').style.color = '#00BFFF';
      }
      document.getElementById('next').style.color = '#00BFFF';
      this.offset = (this.currentPage - 1) * this.limit;
      this.productService.viewProducts(this.limit, this.offset)
        .subscribe(res => {
          this.products = res;
          console.log(this.offset);
          console.log(this.limit);
        });
    }
  }

  delete(type, id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus    = true;
    const dialogRef           = this.dialog.open(ConfirmationDialogComponent, {...dialogConfig, data: {type, id}});
    if (type === 'productCategory') {
      dialogRef.afterClosed().subscribe(() =>
        this.productService.viewCategories()
          .subscribe(res => {
            this.categories = res;
          }));
    } else if (type === 'wholesaler-product') {
      dialogRef.afterClosed().subscribe(() =>
        this.productService.viewWpByProduct(this.currentProduct.id)
          .subscribe(res => {
            this.wholesalerProducts = res;
          }));
    } else if (type === 'stock') {
      dialogRef.afterClosed().subscribe(() =>
        this.productService.viewStocks()
          .subscribe(res => {
            this.stocks = res;
          }));
    } else if (type === 'inv') {
      dialogRef.afterClosed().subscribe(() =>
        this.productService.viewInventory()
          .subscribe(res => {
            this.inventory = res;
          }));
    } else {
      dialogRef.afterClosed().subscribe(() =>
        this.productService.viewProducts(this.limit, this.offset)
          .subscribe(res => {
            this.products = res;
          }));
    }
  }

  changeActiveness(type: string, id: number, isActive: boolean, index?: number) {
    const data = {
      is_active  : !isActive,
      is_assigned: false
    };
    if (type === 'category') {
      console.log(data);
      this.productService.updateCategory(id, data)
        .subscribe(result => {
          console.log(result);
          this.productService.viewCategories()
            .subscribe(res => {
              console.log(res);
              this.categories = res;
            });
        });
    } else if (type === 'product') {
      this.productService.updateProduct(id, data)
        .subscribe(result => {
          console.log(result);
          this.products[index] = result;
        });
    } else if (type === 'wp') {
      data.is_assigned = !isActive;
      console.log(data.is_assigned);
      this.productService.updateWp(id, data)
        .subscribe(result => {
          this.wholesalerProducts[index] = result;
        });
    }
  }

  createCategory() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);
    dialogRef.afterClosed().subscribe(() =>
      this.productService.viewCategories()
        .subscribe(res => {
          this.categories = res;
        })
    );
  }

  updateCategory(category: ProductCategory) {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      autoFocus: true,
      data     : {category},
    });
    dialogRef.afterClosed().subscribe(() =>
      this.productService.viewCategories()
        .subscribe(res => {
          this.categories = res;
        })
    );
  }

  searchProducts(query: string) {
    this.productService.searchProducts(query)
      .subscribe(res => {
        console.log(this.form.value);
        this.products = res;
      });
  }

  createProduct() {
    const dialogRef = this.dialog.open(CreateProductComponent);
    dialogRef.afterClosed().subscribe(() =>
      this.productService.viewProducts(this.limit, this.offset)
        .subscribe(res => {
          this.products = res;
        })
    );
  }

  updateProduct(product: Product, index?: number) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      autoFocus: true,
      data     : {product},
    });
    dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.products[index] = res;
        }
      }
    );
  }

  viewWPByProduct(productId: number) {
    document.getElementById('table-prod').style.display = 'none';
    document.getElementById('table-cat').style.display  = 'none';
    document.getElementById('table-deal').style.display = 'block';

    this.currentProduct             = this.products.find(p => p.id === productId);
    this.currentProductTitle        = this.currentProduct.title;
    this.currentProductManufacturer = this.currentProduct.manufacturer;
    console.log(this.currentProduct);
    this.productService.viewWpByProduct(productId)
      .subscribe(res => {
        this.wholesalerProducts = res;
      });
  }

  createWP(product) {
    console.log(product);
    const dialogRef = this.dialog.open(CreateWholesalerProductComponent, {
      data: {product}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.productService.viewWpByProduct(product.id)
        .subscribe(result => {
          this.wholesalerProducts = result;
        });
    });
  }

  updateWP(wholesalerProduct) {
    console.log(wholesalerProduct);
    const dialogRef = this.dialog.open(UpdateWholesalerProductComponent, {
      data: {wholesalerProduct}
    });
    dialogRef.afterClosed().subscribe(res => {
      this.productService.viewWpByProduct(this.currentProduct.id)
        .subscribe(result => {
          this.wholesalerProducts = result;
        });
    });
  }

  viewAllWholesalersProduct() {
    this.productService.viewAllWPs()
      .subscribe(res => {
        this.wholesalerProducts = res;
      });
  }

  createStock() {
    const dialogRef = this.dialog.open(CreateStockComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.productService.viewStocks()
        .subscribe(res => {
          this.stocks = res;
        });
    });
  }

  updateStock(stock: Stock) {
    const dialogRef = this.dialog.open(UpdateStockComponent, {data: {stock}});
    dialogRef.afterClosed().subscribe(() => {
      this.productService.viewStocks()
        .subscribe(res => {
          this.stocks = res;
        });
    });
  }


}
