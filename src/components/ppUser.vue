<template>
  <li class="item">
    <img class="item-img" :src="avatar" :alt="login">
    <h3 class="item-login">{{ login }}</h3>
    <ul class="item-short-info">
      <li class="item-short-info-item">репозиториев <span class="item-short-info-item-data">{{ repo }}</span></li>
      <li class="item-short-info-item">подписчиков <span class="item-short-info-item-data">{{ follower }}</span></li>
    </ul>
    <button
        class="btn"
        @click="$emit('open')"
    >Подробнее</button>
    <teleport to="body">
      <app-modal
          v-if="showModal"
          :login='login'
          :repo="repo"
          :follower="follower"
      ></app-modal>
    </teleport>
  </li>
</template>

<script>
import AppPopup from './AppPopup.vue'

export default {
  props: {
    login: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    repo: {
      type: Number,
      required: true
    },
    follower: {
      type: Number,
      required: true
    },
    showModal: {
      type: Boolean
    }
  },
  components: {AppPopup}
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
}

.item-login {
  font-size: 26px;
  line-height: 1.25;
}

.item:last-child {
  margin: 0;
}

.item-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.item-short-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  list-style: none;
  margin: 0;
  padding: 0;
}

.item-short-info-item {
  margin: 0 10px 0 0;
  padding: 0;
}

.item-short-info-item:last-child {
  margin: 0;
}

.item-short-info-item-data {
  display: inline-block;
  min-width: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  color: #000000;
  background: rgba(209, 213, 2018, 0.5);
  border: 1px solid rgba(209, 213, 2018, 0.5);
  box-sizing: border-box;
}
</style>