//@ts-check

function collectionAPI() {

    const getCollections = async () => {
        const ret = await fetch("http://localhost:3456/collections", {
            "method": "GET",
          })
          .then(response => {return response.json()})
          .catch(err => { console.log(err); 
          });
        return ret;
    }

    const createCollection = async (data) => {
        const ret = await fetch("http://localhost:3456/collections", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })
          .then(response => {return response.json()})
          .catch(err => { return err;
          });
        return ret;
    }

    return {
        getCollections, createCollection
      };
}

export default collectionAPI();
