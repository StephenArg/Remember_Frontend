const userAuthFetch = (setUser) => {
  const today = new Date().toISOString().slice(0, 10)

  if (setUser !== undefined) {
    return fetch(`${process.env.REACT_APP_API_LOCATION}/users/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({jwt: localStorage.getItem("token"), date: today})
            }).then(res => res.json())
            .then((u)=>{
              if (u["error"] === "token error"){
                localStorage.removeItem("token")
                setUser({})
              } else {
                setUser(u)
              }
            }) 
          } else {
              return fetch(`${process.env.REACT_APP_API_LOCATION}/users/auth`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({jwt: localStorage.getItem("token"), date: today})
                }).then(res => res.json())
                .then((u)=>{
                  if (u["error"] === "token error"){
                    return {}
                  } else {
                    return u
                  }
                }) 
          }
}

export default userAuthFetch