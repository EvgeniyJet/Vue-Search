import { createStore } from 'vuex'
import axios from "axios"

const SET_USERS_TO_STATE = 'SET_USERS_TO_STATE'
const SET_INPUT_VALUE = 'SET_INPUT_VALUE'
// const SET_SUBMIT_FORM = 'SET_SUBMIT_FORM'
const SET_USERS_RESET = 'SET_USERS_RESET'

export const store = createStore({	
  state:{
		users: [],
		value: []
  },
	getters:{
		getUserData(state){
			return state.users
		},
		USERNAME(state){
			return state.value
		}
	},
  mutations: {
		SET_USERS_TO_STATE: (state, users)=>{
			state.users = users;
		},
		SET_INPUT_VALUE: (state, value)=>{
			state.value.push(value)
		},
		// SET_USERS_RESET:(state)=>{
		// 	state.users = []
		// },
	},
	props:{	},
	actions:{
		// remove({commit}, users) {
    //   commit('SET_USERS_RESET', users)          
		// 		},
		inputValue:({commit}, value)=>{
			commit("SET_INPUT_VALUE", value)
		},
		getUsersApi({commit}){			
			const gh_api = "https://api.github.com/search/users?q=";
			const userInput = this.value;            
			const per_page = "&page=5";
			const page = "&page=1";
			const order = "desc";
			const repo_sort = `&sort=repositories&order=${order}`
			const gh_endpoint = gh_api + userInput + per_page + page + repo_sort;
			return axios(gh_endpoint,{
				method: "GET"
			})
			.then((users)=>{				
				commit('SET_USERS_TO_STATE', users);
				return users;
			})
			.catch((error)=>{
				console.log(error);
				return error;
			})
		}
	}	
})
