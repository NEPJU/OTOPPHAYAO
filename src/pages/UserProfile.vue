<template>
  <div style="margin-top: 45px">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div style="margin-top: 45px">
          <q-card
            class="my-card"
            bordered
            style="padding-bottom: 25px; padding-top: 15px"
          >
            <div style="text-align: center; font-size: 35px">ยินดีต้อนรับ</div>
            <div v-if="userLoaded" style="text-align: center; font-size: 16px">
              คุณ {{ user.username }}
            </div>
            <div v-if="userLoaded" style="text-align: center; font-size: 16px">
              ชื่อ {{ user.name }}
            </div>
            <div v-if="userLoaded" style="text-align: center; font-size: 16px">
              อีเมล {{ user.email }}
            </div>
          </q-card>
        </div>

        <div style="margin-top: 20px">
          <q-card class="my-card" bordered>
            <div class="row">
              <div class="col-md-2">
                <div style="font-size: 25px; padding: 15px">ข้อมูลส่วนตัว</div>
              </div>
              <div class="col-md-4" style="padding: 15px">
                <div v-if="userLoaded" style="font-size: 16px" class="infotext">
                  คุณ {{ user.username }}
                </div>
                <div v-if="userLoaded" style="font-size: 16px" class="infotext">
                  ชื่อ {{ user.name }}
                </div>
                <div v-if="userLoaded" style="font-size: 16px" class="infotext">
                  อีเมล {{ user.email }}
                </div>
                <div v-if="userLoaded" style="font-size: 16px" class="infotext">
                  ที่อยู่ในการจัดส่ง {{ user.address }}
                </div>
                <div v-if="userLoaded" style="font-size: 16px" class="infotext">
                  เบอร์โทรศัพท์ {{ user.phone_number }}
                </div>
                <div
                  style="display: flex; justify-self: center; margin-top: 15px"
                  class="infotext"
                >
                  <div
                    style="
                      display: flex;
                      justify-self: center;
                      margin-top: 15px;
                    "
                    class="infotext"
                  >
                    <q-btn @click="showEditDialog = true" color="red">
                      แก้ไขข้อมูล
                      <q-icon name="edit" />
                    </q-btn>
                  </div>
                </div>
              </div>
              <div class="col-md-6" style="padding: 15px">
                <div style="display: flex; justify-content: center">
                  <div v-if="userLoaded">
                    <q-img
                      :src="user.profileimg"
                      style="height: 250px; width: 250px; border-radius: 50%"
                    />
                    <div style="padding: 30px">
                      <input
                        type="file"
                        @change="onFileChange"
                        style="margin-top: 25px; margin-bottom: 10px"
                      />
                      <q-card-actions>
                        <q-btn
                          flat
                          label="ยกเลิก"
                          v-close-popup
                          style="
                            width: 100px;
                            background-color: #fa003f;
                            color: aliceblue;
                          "
                        />
                        <q-btn
                          flat
                          label="บันทึก"
                          @click="submitEdit"
                          style="
                            background-color: #00916e;
                            width: 100px;
                            color: aliceblue;
                          "
                        />
                      </q-card-actions>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <!-- Favorite Products Section -->
        <div style="margin-top: 20px">
          <q-card class="my-card" bordered>
            <div style="font-size: 25px; padding: 15px">สินค้าที่ชื่นชอบ</div>
            <div v-if="favoritesLoaded" class="row">
              <div
                v-for="favorite in favorites"
                :key="favorite.ProductID"
                class="col-md-4"
                style="padding: 15px"
              >
                <q-card>
                  <q-img :src="favorite.ProductImage" style="height: 150px" />
                  <q-card-section>
                    <div class="text-h6">{{ favorite.ProductName }}</div>
                    <div>{{ favorite.ProductDescription }}</div>
                    <div>{{ favorite.ProductPrice }} บาท</div>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn
                      @click="removeFavorite(favorite.ProductID)"
                      color="red-12"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        display="block"
                        id="Heart"
                      >
                        <path
                          d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z"
                        />
                      </svg>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
            <div v-else>
              <q-spinner size="30px" />
              กำลังโหลด...
            </div>
          </q-card>
        </div>
        <!-- End Favorite Products Section -->

        <q-dialog v-model="showEditDialog">
          <q-card style="height: 350px; width: 600px">
            <q-card-section>
              <div class="text-h6">แก้ไขข้อมูลส่วนตัว</div>
            </q-card-section>
            <q-card-section>
              <q-form @submit.prevent="submitEdit">
                <q-input v-model="editUser.name" label="ชื่อ-สกุล" />
                <q-input
                  v-model="editUser.address"
                  label="ที่อยู่"
                  autogrow
                  stack-label
                />
                <q-input
                  v-model="editUser.phone_number"
                  label="เบอร์โทรศัพท์"
                  mask="### - ### - ####"
                />
              </q-form>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="บันทึก" @click="submitEdit" />
              <q-btn flat label="ยกเลิก" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div
          class="d-flex justify-center mt-4"
          style="margin: 15px; display: flex"
        >
          <q-btn @click="link" color="red" label="กลับหน้าหลัก" />
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const user = ref({});
    const userLoaded = ref(false);
    const showEditDialog = ref(false);
    const editUser = ref({
      name: "",
      address: "",
      phone_number: "",
      profileimg: "",
    });

    // New states for favorites
    const favorites = ref([]);
    const favoritesLoaded = ref(false);

    const fetchUserData = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/${userId}`
          );
          user.value = response.data;
          Object.assign(editUser.value, response.data);
          userLoaded.value = true;

          // Fetch favorite products
          await fetchFavoriteProducts(userId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No user ID found in session storage");
        router.push("/login");
      }
    };

    // Fetch favorite products based on user ID
    const fetchFavoriteProducts = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favorites/${userId}`
        );
        favorites.value = response.data;
        favoritesLoaded.value = true;
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    // Remove favorite product
    const removeFavorite = async (productId) => {
      const userId = sessionStorage.getItem("userId");
      try {
        await axios.delete(
          `http://localhost:3000/favorites/${userId}/${productId}`
        );
        // Refresh the favorites list
        await fetchFavoriteProducts(userId);
      } catch (error) {
        console.error("Error removing favorite product:", error);
      }
    };

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          editUser.value.profileimg = reader.result;
        };
      }
    };

    const submitEdit = async () => {
      try {
        const updatedData = {
          name: editUser.value.name,
          address: editUser.value.address,
          phone_number: editUser.value.phone_number,
          profileimg: editUser.value.profileimg,
        };

        console.log("Sending updated data:", updatedData);

        const response = await axios.put(
          `http://localhost:3000/user/${user.value.member_id}`,
          updatedData
        );

        console.log("Update response:", response.data);

        await fetchUserData();
        showEditDialog.value = false;
      } catch (error) {
        console.error("Error updating user data:", error);
        if (error.response) {
          console.error(
            "Server responded with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        }
      }
    };

    onMounted(fetchUserData);

    const link = () => {
      router.push("/main");
    };

    return {
      user,
      userLoaded,
      showEditDialog,
      editUser,
      onFileChange,
      link,
      submitEdit,
      favorites,
      favoritesLoaded,
      removeFavorite, // Add this to the return object
    };
  },
};
</script>

<style>
.col-1 {
  background-image: url("/src/assets/logo/bgside.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.col-10 {
  min-height: 100vh;
  background-color: #fce7d1;
}

.infotext {
  padding-bottom: 20px;
}
</style>
