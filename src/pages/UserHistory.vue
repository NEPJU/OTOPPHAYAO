<template lang="">
  <div style="margin-top: 45px">
    <div class="row">
      <div class="col bgside"></div>
      <div class="col-10 bgcenter">
        <div>
          <!-- <p style="font-size: 35px">โปรไฟล์</p> -->
          <q-card
            class="my-card"
            bordered
            style="padding-bottom: 25px; padding-top: 15px"
          >
            <div style="text-align: center; font-size: 35px">ยินดีต้อนรับ</div>
            <div style="text-align: center; font-size: 16px">คุณ SOMEONE</div>
            <div style="text-align: center; font-size: 16px">
              ชื่อ สมหมี อยากกินไข่เจียว
            </div>
            <div style="text-align: center; font-size: 16px">
              อีเมล awrgdrg@gmail.com
            </div>
          </q-card>
        </div>

        <q-card style="margin-top: 15px">
          <p style="text-align: center">ประวัติการสั่งซื้อ</p>
          <div class="row">
            <div class="col">ผลิตภัณฑ์</div>
            <div class="col">จำนวน</div>
            <div class="col">ราคา</div>
          </div>
        </q-card>
        <q-card style="margin-top: 15px">
          <p>รายการ</p>
          <q-card v-for="product in products" :key="product.id">
            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="col-md-4">
                    <img
                      :src="product.image"
                      alt="Product Image"
                      class="productimage"
                    />
                  </div>
                  <div class="col-4">
                    <p class="ellipsis">{{ product.title }}</p>
                    <p class="ellipsis">{{ product.description }}</p>
                  </div>
                </div>
              </div>
              <div class="col">{{ product.amount }} ชิ้น</div>
              <div class="col">
                {{ product.price }} บาท
                <div
                  style="
                    display: flex;
                    justify-content: flex-end;
                    padding: 0px 15px 15px 0px;
                  "
                >
                  <q-btn>ซื้ออีกครั้ง</q-btn>
                </div>
              </div>
            </div>
            <hr />
          </q-card>
        </q-card>
        <div
          class="justify-center"
          style="display: flex; padding-bottom: 15px; margin-top: 15px"
        >
          <q-btn @click="link" color="red" label="กลับหน้าหลัก" />
        </div>
      </div>
      <div class="col bgside"></div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          title: "กระเป๋าผู้หญิงสไตล์วินเทจ",
          description:
            "กระเป๋าสวยงามและทันสมัยที่มาพร้อมกับดีไซน์สไตล์วินเทจ ช่วยให้คุณสร้างสไตล์ที่โดดเด่น ",
          image: "https://cdn.quasar.dev/img/parallax2.jpg",
          price: 350,
          amount: 20,
          purchaseCount: 10,
        },
        {
          id: 2,
          title: "นาฬิกาข้อมือสุภาพบุรุษ",
          description:
            "นาฬิกาข้อมือสำหรับผู้ชายที่มีสไตล์สุภาพบุรุษ ดีไซน์ทันสมัยและคุณภาพดี",
          image: "https://cdn.quasar.dev/img/parallax2.jpg",
          price: 350,
          amount: 20,
          purchaseCount: 10,
        },
        {
          id: 3,
          title: "เสื้อผ้าสำหรับผู้หญิงสไตล์ออกงาน",
          description:
            "เสื้อผ้าสำหรับผู้หญิงที่มีสไตล์ออกงาน ดีไซน์ทันสมัยและสวยงาม",
          image: "https://cdn.quasar.dev/img/parallax2.jpg",
          price: 350,
          amount: 20,
          purchaseCount: 10,
        },
        {
          id: 4,
          title: "เสื้อผ้าสำหรับผู้หญิงสไตล์ออกงาน",
          description:
            "เสื้อผ้าสำหรับผู้หญิงที่มีสไตล์ออกงาน ดีไซน์ทันสมัยและสวยงาม",
          image: "https://cdn.quasar.dev/img/parallax2.jpg",
          price: 350,
          amount: 20,
          purchaseCount: 10,
        },
      ],
    };
  },
  setup() {
    const router = useRouter();

    const link = () => {
      router.push("/main");
    };

    return {
      link,
    };
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
