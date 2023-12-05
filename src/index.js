const API = "http://localhost:3000/toys"
let addToy = false



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const toyForm = document.querySelector(".add-toy-form")

  const likeBtn = document.getElementsByClassName("like-btn")   
  

  addBtn.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
  
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
   
    data.likes = 0
    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => renderCard(data))
  })

  fetch(API)
 	.then((response) => response.json())
  .then(renderToys)

  function renderCard(toy){
    const card = document.createElement("div")
		card.classList.add("card")
		  
    const h2 = document.createElement("h2")
		h2.textContent = toy.name
    

    const img = document.createElement("img")
		img.classList.add("toy-avatar")
    img.src = toy.image 
    

    const p = document.createElement("p")
		p.textContent = `${toy.likes} Likes`
   

    const button = document.createElement("button")
    button.classList.add("like-btn")
    button.setAttribute("id", `${toy.id}`) 
    button.textContent = "Like ❤️"
    

    card.append(h2, img, p, button)
    document.querySelector("#toy-collection").appendChild(card)      
    

    button.addEventListener("click", () => {
    + 1
      p.textContent = `${toy.likes} Likes`
    

      fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        "likes": toy.likes
        })
      })
      .then((response) => response.json())
       
    })
  }
   
  function renderToys(toyList) {
		

    toyList.forEach((toy) => {
      renderCard(toy)
    }) 
  } 
})

 