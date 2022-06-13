//@ts-check

function collectionAPI() {


    const createIndicator = async () => {
      
    }

    const getUsers = async () => {
        const ret = await fetch("http://localhost/collections", {
            "method": "GET",
          })
          .then(response => {return response.json()})
          .catch(err => { console.log(err); 
          });
        return ret;
    }

    const createCollection = async (data) => {
        const ret = await fetch("http://localhost/collections", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })
          .then(response => {return response.json()})
          .catch(err => { console.log(err); 
          });
        console.log('ret == >');
        console.log(ret);
        return ret;
    }

    return {
        getUsers, createCollection
      };
}

export default collectionAPI();
