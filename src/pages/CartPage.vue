<template>
  <div style="margin-top: 45px">
    <div class="row">
      <div class="col-1 bgside"></div>
      <div class="col-10 bgcenter">
        <div>
          <q-card
            class="my-card"
            bordered
            style="padding-bottom: 25px; padding-top: 15px"
          >
            <div style="text-align: center; font-size: 35px">ยินดีต้อนรับ</div>
            <div style="text-align: center; font-size: 16px">
              คุณ {{ userName }}
            </div>
            <div style="text-align: center; font-size: 16px">
              ชื่อ {{ Name }}
            </div>
            <div style="text-align: center; font-size: 16px">
              อีเมล {{ userEmail }}
            </div>
          </q-card>
        </div>
        <div class="row" style="margin-top: 20px">
          <div class="col-1"></div>
          <div class="col-10">
            <q-card
              v-for="product in cartItems"
              :key="product.product_id"
              style="margin-top: 10px"
            >
              <div class="row" style="padding: 15px">
                <div class="col-4">
                  <q-btn
                    @click="decreaseAmount(product)"
                    color="red-12"
                    label="-"
                    class="amount"
                    :disable="product.quantityInCart <= 1"
                  />
                  <!-- แสดงจำนวนสินค้าที่อยู่ในตะกร้า -->
                  <q-btn
                    color="red-12"
                    class="amount"
                    :label="product.quantityInCart"
                  />
                  <!-- ปุ่มเพิ่มจำนวนสินค้า -->
                  <q-btn
                    @click="increaseAmount(product)"
                    color="red-12"
                    label="+"
                    class="amount"
                    :disable="product.quantityInCart >= product.quantity"
                  />
                  <p style="color: black">
                    สินค้าทั้งหมด {{ product.quantityInCart }} /
                    {{ product.quantity }}
                  </p>
                  <q-btn
                    @click="confirmRemoveProduct(product)"
                    color="red"
                    icon="delete"
                  />
                  <router-link
                    :to="`/product/${product.product_id}`"
                    class="no-underline"
                  >
                    <q-btn color="red" icon="search" />
                  </router-link>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-md-4">
                      <img
                        :src="product.image_base64"
                        alt="Product Image"
                        class="productimage"
                      />
                    </div>
                    <div class="col-md">
                      {{ product.product_name }}
                      <br />
                      {{ product.price }} บาท
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  {{ product.price * product.quantityInCart }} บาท
                </div>
              </div>
            </q-card>

            <q-card style="margin-top: 15px">
              <p
                style="
                  padding: 15px 15px 0px 15px;
                  display: flex;
                  justify-content: space-between;
                "
              >
                ราคารวม
                <span style="text-align: end">{{ totalAmount }} บาท</span>
              </p>
              <div
                style="
                  display: flex;
                  justify-content: flex-end;
                  padding: 0px 15px 15px 0px;
                "
              >
                <q-btn color="red">สั่งซื้อสินค้า</q-btn>
              </div>
            </q-card>
          </div>
          <div class="col-1"></div>
        </div>
        <div
          class="justify-center"
          style="display: flex; padding-bottom: 15px; margin-top: 15px"
        >
          <q-btn @click="link" color="red" label="กลับหน้าหลัก" />
        </div>
      </div>
      <div class="col-1 bgside"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

export default {
  data() {
    return {
      cartItems: [],
      userName: "",
      userEmail: "",
      Name: "", // Add a new data property for Name
    };
  },
  methods: {
    async fetchCartItems() {
      try {
        const memberId = sessionStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/cart/${memberId}`
        );
        const cartItems = response.data.map((item) => ({
          ...item,
          quantityInCart: 1, // Set the quantity in cart to the quantity from the server
        }));

        // Check if any products were previously added to the cart
        if (localStorage.getItem("previousCartItems")) {
          const previousCartItems = JSON.parse(
            localStorage.getItem("previousCartItems")
          );
          // Loop through the previous cart items
          for (const previousCartItem of previousCartItems) {
            // Check if the previous cart item is in the current cart items
            const existingItemIndex = cartItems.findIndex(
              (item) => item.product_id === previousCartItem.product_id
            );
            if (existingItemIndex !== -1) {
              // Update the quantity in cart for the existing item
              cartItems[existingItemIndex].quantityInCart =
                previousCartItem.quantityInCart;
            } else {
              // Add the previous cart item to the current cart items
              cartItems.push(previousCartItem);
            }
          }
        }

        this.cartItems = cartItems;
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
    async fetchUserData() {
      try {
        const memberId = sessionStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/user/${memberId}`
        );
        this.userName = response.data.username;
        this.userEmail = response.data.email;
        this.Name = response.data.name; // Set the Name data property from the API response
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    link() {
      this.$router.push("/main");
    },
    increaseAmount(product) {
      if (product.quantityInCart < product.quantity) {
        product.quantityInCart++;
      }
    },
    decreaseAmount(product) {
      if (product.quantityInCart > 1) {
        product.quantityInCart--;
      }
    },
    async removeProduct(product) {
      const memberId = sessionStorage.getItem("userId");
      try {
        await axios.delete(
          `http://localhost:3000/cart/${memberId}/${product.product_id}`
        );
        this.cartItems = this.cartItems.filter(
          (item) => item.product_id !== product.product_id
        );
        Swal.fire("สินค้าได้ถูกนำออกจากตะกร้า");
      } catch (error) {
        console.error("Error removing product:", error);
        Swal.fire(
          "Error!",
          "There was an issue removing the product. Please try again.",
          "error"
        );
      }
    },
    confirmRemoveProduct(product) {
      Swal.fire({
        title: "ต้องการที่จะเอาออกจากตะกร้าสินค้าใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ลบสินค้าออกจากตะกร้า",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeProduct(product);
        }
      });
    },
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantityInCart,
        0
      );
    },
  },
  created() {
    this.fetchCartItems();
    this.fetchUserData();
  },
};
</script>

<style>
.bgside {
  background-image: url("/src/assets/logo/bgside.png");
}
.bgcenter {
  min-height: 100vh;
  background-color: bisque;
}
.productimage {
  max-width: 100px;
}
</style>
