<template>
	<div v-if="users.length">
		<div class="card">
			<div class="card-top">
				<p class="card-user-count">Найдено пользователей: <b>{{userCount}}</b></p>
				<div class="sort" v-if="users.length > 1">
						<span class="sort-list-item__font">Сортировать по:</span>
							<button
								class="btn sortBtn"
								:class="[currentDirection ==='asc' ? '' : 'primary']"
								@click="$emit('sortedRepo')"
							>реппозиторию</button>					
				</div>
			</div>
			<div class="list">
				<div class="item"
					@click="$emit('openModal', user)"
					:key="user.id + '-login'"
          v-for="user in sortingByRepos"
				>
					<img class="item-img" 
					:src="user.avatar_url" 
					:alt="user.login">
					<h3 class="item-login">{{user.login}}</h3>
					<ul class="item-short-info">
						<div class="item-short-info-item">Подписчиков 
							<span class="item-short-info-item-data">
								{{ user.follower_count }}
							</span>
						</div>
						<div class="item-short-info-item">Репозиториев 
							<span class="item-short-info-item-data">
								{{ user.repo_count }}
							</span>
						</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
	
	<div class="card center" v-else>
    <h4>Пользователей ещё нет</h4>
  </div>
	
</template>

<script>
export default {
  $emits: ['sortedRepo', 'openModal'],
  props: {
    users: {
      type: Array,
      required: true
    },
    userCount: {
      type: Number,
      required: true
    },
    sortingByRepos: {
      type: Array,
      required: true
    },
    currentDirection: {
      type: String,
      required: true
    },
    modal: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.list {
  list-style: none;
  margin: 0;
  padding: 0;
	display: grid;
	/* grid-template-columns: repeat(auto-fill, minmax(150px, 250px)); */
	grid-template-columns: repeat(auto-fill, 100%);
	justify-content: center;
	grid-gap: 30px;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
	background-color: #34495e;
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

.sort {
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
	justify-content: flex-end;
  margin: 0;
  padding: 0;
  color: #2c3e50;
}

.sort-list-item__font{
	color: #ecf0f1;
	margin-right: 10px;
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
	text-align: center;
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

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 15px 0;
  padding: 0 40px;
}

.card-user-count {
  width: 100%;
  font-size: 18px;

}
.sortBtn{
	background-color: #2ecc71;
	font-size: 15px;
	padding: 8px;
	border-radius: 5px;
	border:none;
}

.primary{
	background-color: #3498db;
	
}

</style>