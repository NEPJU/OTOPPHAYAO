<template>
  <div class="pp">
    <div class="wrapper">
      <input type="radio" checked="true" name="back" id="back-1" />
      <input type="radio" name="back" id="back-2" />
      <input type="radio" name="back" id="back-3" />
      <input type="radio" name="back" id="back-4" />
      <input type="radio" name="back" id="back-5" />
      <input type="radio" name="back" id="back-6" />

      <input type="radio" checked="true" name="next" id="next-1" />
      <input type="radio" name="next" id="next-2" />
      <input type="radio" name="next" id="next-3" />
      <input type="radio" name="next" id="next-4" />
      <input type="radio" name="next" id="next-5" />
      <input type="radio" name="next" id="next-6" />

      <div class="buttons">
        <!--    BACK Label    -->
        <label for="back-1"><i class="ti ti-chevron-left"></i></label>
        <label for="back-2"><i class="ti ti-chevron-left"></i></label>
        <label for="back-3"><i class="ti ti-chevron-left"></i></label>
        <label for="back-4"><i class="ti ti-chevron-left"></i></label>
        <label for="back-5"><i class="ti ti-chevron-left"></i></label>
        <label for="back-6"><i class="ti ti-chevron-left"></i></label>
        <!--    NEXT Label    -->
        <label for="next-1"><i class="ti ti-chevron-right"></i></label>
        <label for="next-2"><i class="ti ti-chevron-right"></i></label>
        <label for="next-3"><i class="ti ti-chevron-right"></i></label>
        <label for="next-4"><i class="ti ti-chevron-right"></i></label>
        <label for="next-5"><i class="ti ti-chevron-right"></i></label>
        <label for="next-6"><i class="ti ti-chevron-right"></i></label>
      </div>
      <div class="views">
        <div class="move-back">
          <div class="inner">
            <input type="radio" name="slider" id="c1" style="display: none" />
            <input type="radio" name="slider" id="c2" style="display: none" />
            <input type="radio" name="slider" id="c3" style="display: none" />
            <input
              type="radio"
              checked="true"
              name="slider"
              id="c4"
              style="display: none"
            />
            <input type="radio" name="slider" id="c5" style="display: none" />
            <input type="radio" name="slider" id="c6" style="display: none" />

            <label for="c1" class="card c1"></label>
            <label for="c2" class="card c2"></label>
            <label for="c3" class="card c3"></label>
            <label for="c4" class="card c4"></label>
            <label for="c5" class="card c5"></label>
            <label for="c6" class="card c6"></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageUrl: "",
      imageName: "",
    };
  },
  methods: {
    async uploadImage(base64Data, imageName) {
      try {
        const response = await axios.post("http://localhost:3000/upload", {
          imageName: imageName,
          imageData: base64Data,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    async submitImage() {
      if (this.imageUrl && this.imageName) {
        this.uploadImage(this.imageUrl, this.imageName);
      }
    },
    async handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = await this.readFile(file);
        this.imageUrl = imageUrl;
      }
    },

    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --card-width: 200px;
  --card-height: 300px;
  --gap: 16px;
  --transition-duration: 0.4s;
  --bg-image-1: url("https://images.unsplash.com/photo-1");
  --bg-image-2: url("https://images.unsplash.com/photo-2");
  --bg-image-3: url("https://images.unsplash.com/photo-3");
  --bg-image-4: url("https://images.unsplash.com/photo-4");
  --bg-image-5: url("https://images.unsplash.com/photo-5");
  --bg-image-6: url("https://images.unsplash.com/photo-6");
}

html {
  height: 100%;
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  width: 100%;
  background: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.buttons label {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #2f2f2f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #232323;
  color: #fff;
  font-size: 1.6rem;
}

.views {
  width: 100%;
  max-width: calc(var(--card-width) * 3 + var(--gap) * 2);
  overflow: hidden;
  height: var(--card-height);
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner {
  display: flex;
  gap: var(--gap);
  transition: transform var(--transition-duration);
}

.card {
  width: var(--card-width);
  height: var(--card-height);
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  cursor: pointer;
  transition: transform var(--transition-duration);
}

.card:hover {
  transform: scale(1.05);
}

.c1 {
  background-image: var(--bg-image-1);
}

.c2 {
  background-image: var(--bg-image-2);
}

.c3 {
  background-image: var(--bg-image-3);
}

.c4 {
  background-image: var(--bg-image-4);
}

.c5 {
  background-image: var(--bg-image-5);
}

.c6 {
  background-image: var(--bg-image-6);
}

/* Hide other buttons initially */
.buttons label[for="next-2"],
.buttons label[for="back-2"],
.buttons label[for="next-3"],
.buttons label[for="back-3"],
.buttons label[for="next-4"],
.buttons label[for="back-4"],
.buttons label[for="next-5"],
.buttons label[for="back-5"],
.buttons label[for="next-6"],
.buttons label[for="back-6"] {
  display: none;
}

/* Display the appropriate buttons */
#back-1:checked ~ .buttons label[for="next-1"],
#next-1:checked ~ .buttons label[for="back-1"] {
  display: none;
}

#next-1:checked ~ .buttons label[for="next-2"],
#next-2:checked ~ .buttons label[for="back-2"] {
  display: flex;
}

#back-2:checked ~ .buttons label[for="back-1"],
#next-2:checked ~ .buttons label[for="next-3"],
#next-3:checked ~ .buttons label[for="back-3"],
#next-4:checked ~ .buttons label[for="back-4"],
#next-5:checked ~ .buttons label[for="back-5"],
#next-6:checked ~ .buttons label[for="back-6"] {
  display: flex;
}

/* Control the sliding animations */
#next-1:checked ~ .views .inner {
  transform: translateX(0);
}

#next-2:checked ~ .views .inner {
  transform: translateX(calc(-1 * (var(--card-width) + var(--gap))));
}

#next-3:checked ~ .views .inner {
  transform: translateX(calc(-2 * (var(--card-width) + var(--gap))));
}

#next-4:checked ~ .views .inner {
  transform: translateX(calc(-3 * (var(--card-width) + var(--gap))));
}

#next-5:checked ~ .views .inner {
  transform: translateX(calc(-4 * (var(--card-width) + var(--gap))));
}

#next-6:checked ~ .views .inner {
  transform: translateX(calc(-5 * (var(--card-width) + var(--gap))));
}
</style>
