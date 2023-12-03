import { Component } from '@angular/core';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditComponent } from '../product-edit/product-edit.component';

export class Product {
  id: string = '';
  name: string = '';
  price: number = 0;
  hasDiscount: boolean = false;
  discountBuy!: number;
  discountFree!: number;
  validFrom: Date = new Date();
}

export enum Operation {
  CREATE = '上架',
  UPDATE = '修改',
  DELETE = '下架'
}

const PRODUCTS: Product[] = [
  {
    id: 'jlkjlkjlkjoijafjebfaewfawefnwieugn',
    name: '原味',
    price: 16,
    hasDiscount: true,
    discountBuy: 5,
    discountFree: 1,
    validFrom: new Date('2023-01-01')
  },
  {
    id: 'rferfsefwgthujetgwergwrfwedwwafgty',
    name: '香菇肉包',
    price: 35,
    hasDiscount: false,
    discountBuy: 0,
    discountFree: 0,
    validFrom: new Date('2023-01-01')
  }
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products = PRODUCTS;
  operationEnum = Operation;

  constructor(
    private ngbModal: NgbModal
  ) { }

  public openCreateModal() {
    const modalRef = this.ngbModal.open(ProductEditComponent);
    const product = new Product();
    modalRef.componentInstance.editProduct = product;
    modalRef.componentInstance.validFromNgb = new NgbDate(
      product.validFrom.getFullYear(), product.validFrom.getMonth() + 1, product.validFrom.getDate());
    modalRef.componentInstance.operation = Operation.CREATE;
    modalRef.result.then((result) => {
      console.log('going to create');
      console.log(result);
    });
  }

  public openDeleteModal(product: Product) {
    const modalRef = this.ngbModal.open(ProductEditComponent);
    modalRef.componentInstance.editProduct = product;
    modalRef.componentInstance.operation = Operation.DELETE;
    modalRef.result.then((result) => {
      console.log('going to delete');
      console.log(result);
    });
  }

  public openUpdateModal(product: Product) {
    const modalRef = this.ngbModal.open(ProductEditComponent);
    modalRef.componentInstance.editProduct = product;
    modalRef.componentInstance.validFromNgb = new NgbDate(
      product.validFrom.getFullYear(), product.validFrom.getMonth() + 1, product.validFrom.getDate());
    modalRef.componentInstance.operation = Operation.UPDATE;
    modalRef.result.then((result) => {
      console.log('going to update');
      console.log(result);
    });
  }
}
