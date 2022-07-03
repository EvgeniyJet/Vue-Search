<template>
  <div className='popup-overlay' ref="popup-overlay">
			<div className="popup-container">
				<div className="close-btn" @click="closePopup">✕</div>
				<div className="popup-inner">
					<slot>

					</slot>
				</div>
			</div>
		</div>
</template> 
<script>
export default{
	name: "Popup",
	props: {},
	data(){
		return{}
	},
	emits:{
		closePopup: null,
	},
	methods:{
		closePopup(){
			this.$emit('closePopup')
		}
	},
	mounted(){
		this.getUsersApi()
		let vm = this;
		document.addEventListener('click', (item)=>{
			if(item.target === vm.$refs['popup-overlay']){
				vm.closePopup()
			}
		})
	}
}
</script>