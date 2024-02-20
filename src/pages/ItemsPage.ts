import { expect, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class ItemsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //UI elements of the Page.
  AddToCart = async () => this.Page.$("[text='Add to cart']");
  ShoppingCart = async () => this.Page.$(".shopping_cart_link");
  ContinueShopping = async () => this.Page.$("[data-test='continue-shopping']");
  Item_name = async() =>this.Page.$(".inventory_item_name")
  RemoveItem = async () => this.Page.$("[text='Remove']");

  /**
    *  add item to cart 
    @param item_name : string, 
    */
    public async add_item(item_name: string) {
        await this.Page.locator(`.inventory_item_name :text("${item_name}")`).click();
        await (await this.AddToCart()).click()
  }

    /**
    *  remove item from cart 
    @param item_name : string, 
    */
    public async remove_item(item_name: string) {
        await (await this.ShoppingCart()).click()
        await (await this.RemoveItem()).click()
  }

  /**
   * check shoppint cart
   */
  public async viewShoppingCart(){
    await (await this.ShoppingCart()).click()
  }
  
}