import axios from "axios";


function getDataUser(){
      const gh_api = "https://api.github.com/search/users?q=";
      const userInput = username.value;
      const gh_endpoint = gh_api + userInput;
      const newUserArray = [];

      await axios
        .get(gh_endpoint)
        .then((res) => {
          const fetchRequest = res.data;

          return fetchRequest;
        })
				
        .then(async (res) => {
					console.log(res);
          for (let userIdx in res.items) {
            const userEP = "https://api.github.com/users/";
						
            const fetchRequest = await fetch(userEP + res.items[userIdx].login)
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                return res;
              });           
          }
					users.value = res.items;					
					
        });
			
    };
export default { getDataUser };