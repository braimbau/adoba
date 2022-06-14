//@ts-check

function indicatorAPI() {

    const getIndicators = async () => {
        const ret = await fetch("http://localhost:3456/indicators", {
            "method": "GET",
          })
          .then(response => {return response.json()})
          .catch(err => { console.log(err); 
          });
        return ret;
    }

    const createIndicator = async (data) => {
        const ret = await fetch("http://localhost:3456/indicators", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          })
          .then(response => {return (response.ok ? null : response.statusText)})
          .catch(err => { return err;
          });
        return ret;
    }

    const deleteIndicator = async (id) => {
      const ret = await fetch(`http://localhost:3456/indicators/${id}`, {
          method: "DELETE",
        })
        .then(response => {return (response.ok ? null : response.statusText)})
      return ret;
  }

    return {
        getIndicators, createIndicator, deleteIndicator
      };
}

export default indicatorAPI();
