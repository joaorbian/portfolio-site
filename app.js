// const URL = 'http://localhost:3000'

const URL = './db.json'

async function access() {
   const { value: password } = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
         maxlength: 10,
         autocapitalize: 'off',
         autocorrect: 'off'
      }
   })

   if(password === 'picapau123') {
      // Swal.fire(`Entered password: ${password}`)
      document.querySelector('.container').style.display = 'none'
      document.querySelector('.register').style.display = 'block'
   } else {
      Swal.fire(`Você não tem acesso, não tente novamente`)
   }
}

async function registerProject() {

   const title = document.querySelector('.title').value
   const description = document.querySelector('.description').value
   const website = document.querySelector('.website').value
   const github = document.querySelector('.github').value

   console.log(title, description, website, github)

   await fetch(`${URL}/projects`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         created_at: new Date().toISOString().slice(0, 10),
         updated_at: new Date().toISOString().slice(0, 10),
         title: title,
         description: description, 
         website: website,
         git: github,
      })
   }).then(() => Swal.fire({
      icon: 'success',
      title: 'Projeto registrado com sucesso',
      showConfirmButton: false,
      timer: 1500
   }).then(() => location.reload(true)))

}

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
document.querySelector('.send').addEventListener('click', registerProject)
document.querySelector('.profession').addEventListener('click', access)
getData()
