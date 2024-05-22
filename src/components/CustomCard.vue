<template>
  <div :class="['card', cardClass]">
    <img :src="imgUrl" alt="Game Image" class="card-image">
    <div class="card-content">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgUrl: String,
    cardClass: String
  }
}
</script>

<style scoped>
.card {
  width: 200px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 10px;
  transition: transform 0.3s ease;
}

.card-image {
  width: 100%;
  height: 80%;
  object-fit: cover;
  flex-grow: 1;
  margin-bottom: 0;
  border-radius: 0 0 10px 10px;

}

.card-content {
  background-color: #ffffff;
  color: #000000;
  width: 100%;
  text-align: center;
  margin-top: 0;
}

.card.large {
  height: 350px;
  border-color: #c0c0c0;
}

.card.medium {
  height: 325px;
  border-color: #c0c0c0;
}

.card.small {
  height: 300px;
  border-color: #c0c0c0;
}

.card:hover {
  transform: scale(1.05);
}
</style>