import { ProductService } from '../services/productsService/product.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  products = [];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const cartItems = this.productService.cart.value;
    console.log('cart: ', cartItems);

    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((allProducts) => {
        this.products = allProducts
          .filter((p) => cartItems[p.id])
          .map((fdProduct) => ({
            ...fdProduct,
            count: cartItems[fdProduct.id],
          }));
        console.log('products: ', this.products);
      });
  }

  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Thanks for your order',
      buttons: ['Continue shopping'],
    });

    await alert.present();

    this.productService.checkoutCart();
    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
