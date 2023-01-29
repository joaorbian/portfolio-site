// const URL = 'http://localhost:3000'
const URL = './db.json'



async function getData() {
   try {
      // const response = await fetch(`${URL}/projects`)
      const response = await fetch(URL)
      
      if(response.status == 200) {
         const data = await response.json()
         console.log(data)

         data.map( item => {

            const cardProject = document.querySelector('.card-projects').cloneNode(true)

            cardProject.querySelector('.project-title').innerText = item.title
            cardProject.querySelector('.project-description').innerText = item.description
            cardProject.querySelector('.project-website').href = `${item.website}`
            cardProject.querySelector('.project-git').href = item.git
            
            document.querySelector('.overflow-projects').append(cardProject)
         })
      }

   } catch (error) {
      console.log(error)
   }
}

const inputColor = document.querySelector('.input-color')
inputColor.addEventListener('change', watchColorPicker, false)

function watchColorPicker(event) {
   localStorage.setItem('color', event.target.value)
   location.reload(true)
}

const color = localStorage.getItem('color')
document.querySelector('.input-color').value = color
document.documentElement.style.setProperty('--tertiary', color) 

document.getElementById('model').style.display = 'none'

window.onload = getData()
