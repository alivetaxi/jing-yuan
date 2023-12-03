import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Operation, Product } from '../product/product.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  @Input() editProduct!: Product;
  @Input() validFromNgb!: NgbDate;
  @Input() operation!: Operation;
  operationEnum = Operation;
  activeModal = inject(NgbActiveModal);
  hideErrorMsg = true;
  errorMsg = '';

  validate(): void {
    this.editProduct.name = this.editProduct.name.trim();
    if ("" === this.editProduct.name) {
      this.errorMsg = "商品名稱未填寫";
      this.hideErrorMsg = false;
      return;
    }

    if (this.editProduct.price <= 0) {
      this.errorMsg = "請確認商品售價";
      this.hideErrorMsg = false;
      return;
    }

    if (this.editProduct.discountBuy === undefined && this.editProduct.discountFree === undefined) {
      this.editProduct.hasDiscount = false;
    } else if (this.editProduct.discountBuy !== undefined && this.editProduct.discountFree !== undefined
      && this.editProduct.discountBuy > this.editProduct.discountFree
      && this.editProduct.discountBuy > 0
      && this.editProduct.discountFree > 0) {
      this.editProduct.hasDiscount = true;
    } else {
      this.errorMsg = "請確認商品折扣，若無折扣請將欄位清空";
      this.hideErrorMsg = false;
      return;
    }

    this.editProduct.validFrom = new Date(this.validFromNgb.year, this.validFromNgb.month - 1, this.validFromNgb.day);
    this.activeModal.close(this.editProduct);
  }
}
