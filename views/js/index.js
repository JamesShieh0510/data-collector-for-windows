const ctx = document.getElementsByClassName('canvas__pie')
const green = document.getElementsByClassName('execute__green')
const red = document.getElementsByClassName('execute__red')


const greenArray = [...green]
const redArray = [...red]
const ctxArray = [...ctx]

// Data from backend.
const executeData = []
for (let i = 0; i < greenArray.length; i++) {
  executeData.push({
    green: Math.floor(Math.random()*50 + 1),
    red:   Math.floor(Math.random()*50 + 1)
  })
}
// Data from backend.
const pieData = []
for (let i = 0; i < ctxArray.length; i++) {
  pieData.push([
    Math.floor(Math.random()*50 + 1),
    Math.floor(Math.random()*50 + 1),
    Math.floor(Math.random()*50 + 1)
  ])
}



greenArray.map((value, index) => {
  value.style.height = `${executeData[index].green / (executeData[index].green + executeData[index].red) * 100}%`
})
redArray.map((value, index) => {
  value.style.height = `${executeData[index].red / (executeData[index].green + executeData[index].red) * 100}%`
})

ctxArray.map((value, index) => {
  const myChart = new Chart(value, {
    type: 'pie',
    data: {
      labels: ["START", "REST", "STOP"],
      datasets: [{
          label: '# of Votes',
          // Data from backend.
          data: pieData[index],
          backgroundColor: [
            '#00ff00',
            '#ffcc00',
            '#ff2a2a',
          ]
      }]
    },
    options: {
      legend: {
        display: false,
      },
      cutoutPercentage: 30,
    }
  })
})

/**
 * 新增了以下內容
 */
// The element show in the lightbox.
$(document).ready(function(){
const img = document.body.querySelector('.content__element')

// The lightbox container.
const lightbox = document.body.querySelector('.lightbox')

// Set addEventListener to pop out the lightbox.
value=document.getElementById('0001'); 
value.addEventListener('click', () => {
  lightbox.classList.add('lightbox--active')
  // Copy the element and show in the lightbox.
  const cp = img.cloneNode(true)
  lightbox.children[0].appendChild(cp)
})

// Click the gray area will close the lightbox.
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('lightbox--active')
    lightbox.children[0].removeChild(lightbox.children[0].childNodes[0])
  }
})
});

