<template >
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-container">
      <h3>{{ login }}</h3>
      <ul class="modal-list">
        <li>Репозитории: <span>{{ repo }}</span></li>
        <li>Подписчики: <span>{{ follower }}</span></li>
      </ul>
      <button
          class="btn close-btn"
          @click="$emit('close')"
      >✕</button>
    </div>
  </div>
</template>

<script>
export default {
  $emits: ['close'],
  props: {
    login: {
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
    }
  }
}
</script>

<style scoped>
.popup-overlay {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	overflow: auto;
	background-color: rgba(15, 15, 15, 0.8);
	z-index: 9;
}
.popup-container {
	width: 30vw;
	height: 40vh;
	display: flex;
	justify-content: space-around;
  flex-direction: column;
	background-color: #2c3e50;
	box-shadow: 0px 0px 20px 5px rgba(15, 15, 15, 0.2);
	padding: 20px;
	border-radius: 4px;
	position: absolute;
}
.popup-container h3{
	font-size: 30px;
}
.modal-list {
  display: flex;
  flex-direction: column;
	align-items: center;
  list-style: none;
	grid-gap: 30px;
  margin: 0 0 15px 0;
  padding: 0;
}
.modal-list li{
	font-size: 18px;
}

.close-btn {
	position: absolute;
	top: -50px;
	right: -50px;
	background: #e74c3c;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	line-height: 24px;
}
</style>