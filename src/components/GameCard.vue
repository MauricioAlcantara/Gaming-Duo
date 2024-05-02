<template>
  <div class="card">
    <div class="card-top">
      <img :src="imgUrl" alt="Card image" class="card-image">
      <p class="card-description">{{ description }}</p>
    </div>
    <div class="card-bottom">
      <h3 class="card-title">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    imgUrl: String
  }
}
</script>

<style scoped>
.card {
  width: 180px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  background: #333333;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card-top {
  background-color: #ECECEC;
  padding: 10px;
  color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.card-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 10px auto;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0,0,0,0.6);
}

.card-description {
  font-size: 14px;
  margin-bottom: 10px;
}

.card-bottom {
  background-color: #333333;
  padding: 20px;
}

.card-title {
  font-size: 16px;
  margin: 0;
  color: #ECECEC;
}
</style>
