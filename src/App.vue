<template>
    <div class="main">
			<h1 class="h3 mb-3 font-weight-normal">Search GitHub User</h1>
      <form @submit.prevent="handleSearchUsers" id="userForm" class="form-search">
        
        <input
          type="text"
        	id="query"
          v-model.trim="query"
          placeholder="User Name"
          required
          autofocus
        />
        <button
          class="btn submit"
        	:disabled="isDisabled"
        >
          Search
        </button>				
      </form>
			<app-loader v-if="loading"></app-loader>
      <br />
			
			<the-users-list
				:users="users"
				:user-count="userCount"
				:sorting-by-repos="sortingByRepos"
				:current-direction="currentDirection"
				@open-modal="handleMoreInfo"
				@scroll="handleLoadMoreUsers"
				@sorted-repo="handleSortByRepo('repo')"
			>
			</the-users-list>
      <teleport to="body">
				<app-popup
						v-if="modal"
						:login='modal.login'
						:repo="modal.repo"
						:follower="modal.follower"
						@close="modal = false"
				></app-popup>
			</teleport>
    </div>
</template>
<script>
import axios from 'axios'
import {addDataInfoUser} from './utils/common.js'
import TheUsersList from './components/TheUsersList.vue'
import AppLoader from './components/AppLoader.vue'
import AppPopup from './components/AppPopup.vue'

const DEFAULT_PER_PAGE = 10;
const PATH_BASE = 'https://api.github.com';
const PATH_SEARCH = '/search';
const PATH_USERS = '/users';
const PATH_PER_PAGE = 'per_page=';
const PARAM_PAGE = 'page=';
const PARAM_SEARCH = 'q=';


export default {
  data() {
    return {
      page: 1,
      query: '',
      users: [],
      loading: false,
      modal: false,
      userCount: 0,
      currentSort: 'repo',
      currentDirection: 'asc'
    }
  },
  methods: {
    async handleSearchUsers() {
      try {
        this.loading = true
        const {data} = await axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_USERS}?${PARAM_SEARCH}${this.query}&${PATH_PER_PAGE}${DEFAULT_PER_PAGE}&${PARAM_PAGE}${this.page}`)
        const {items, total_count} = data
        this.userCount = total_count

        this.users = items

        if (items) {
          await this.users.forEach(user => {
            const {login, followers_url} = user

            Promise.allSettled([
              axios.get(`${PATH_BASE}${PATH_USERS}/${login}/repos?${PATH_PER_PAGE}100`),
              axios.get(`${followers_url}?${PATH_PER_PAGE}100`)
            ])
                .then(results => {
                  const [repos, followers] = results

                  const status = 'fulfilled'

                  if (repos.status === status && followers.status === status) {
                    addDataInfoUser(user, {
                      repo: repos.value.data,
                      repo_count: repos.value.data.length,
                      follower: followers.value.data,
                      follower_count: followers.value.data.length
                    })
                  }
                })
                .catch(err => console.log(err))
          })
        }
      } catch (err) {
        console.log(err)
        this.loading = false
      }

      this.loading = false
    },
    async handleLoadMoreUsers() {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          // axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_USERS}?${PARAM_SEARCH}${this.query}&${PARAM_PAGE}${++this.page}`)
          //     .then(response => response.data.items && (this.users = [...this.users, ...response.data.items]))
					
				const {data} = await axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_USERS}?${PARAM_SEARCH}${this.query}&${PATH_PER_PAGE}${DEFAULT_PER_PAGE}&${PARAM_PAGE}${this.page}`)
        const {items, total_count} = data
        this.userCount = total_count

        this.users = items

        if (items) {
          await this.users.forEach(user => {
            const {login, followers_url} = user

            Promise.allSettled([
              axios.get(`${PATH_BASE}${PATH_USERS}/${login}/repos?${PATH_PER_PAGE}100`),
              axios.get(`${followers_url}?${PATH_PER_PAGE}100`)
            ])
                .then(results => {
                  const [repos, followers] = results

                  const status = 'fulfilled'

                  if (repos.status === status && followers.status === status) {
                    addDataInfoUser(user, {
                      repo: repos.value.data,
                      repo_count: repos.value.data.length,
                      follower: followers.value.data,
                      follower_count: followers.value.data.length
                    })
                  }
                })
                .catch(err => console.log(err))
          })
        }
        }
      }
    },
    handleMoreInfo(user) {
      this.modal = {
        login: user.login,
        repo: user.repo_count,
        follower: user.follower_count
      }
    },
    handleSortByRepo(key) {
      if (key === this.currentSort) {
        this.currentDirection = this.currentDirection === 'asc' ? 'desc' : 'asc'
      }

      this.currentSort = key
    }
  },
  computed: {
    sortingByRepos() {
      return this.users.slice().sort((a, b) => {
        let modifier = 1

        if (this.currentDirection === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
    isDisabled() {
      return this.query.length === 0
    }
  },
  mounted() {
    this.handleLoadMoreUsers()
  },
  components: {TheUsersList, AppLoader, AppPopup}
}
</script>

<style src="./app.scss" >

</style>