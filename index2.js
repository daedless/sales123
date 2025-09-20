
// ===== Stock Category Bar Chart =====
const stockCategoryElem = document.getElementById('stockCategoryChart');
if (stockCategoryElem) {
  const stockCategoryCtx = stockCategoryElem.getContext('2d');
  const stockCategoryChart = new Chart(stockCategoryCtx, {
    type: 'bar',
    data: {
      labels: ['Shirts', 'Pants', 'Shoes', 'Jackets'],
      datasets: [{
        label: 'Stock Count',
        data: [120, 90, 50, 70],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#333',
          titleColor: '#fff',
          bodyColor: '#fff',
        }
      },
      scales: {
        y: { 
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' } 
        },
        x: { 
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { color: '#333', font: { size: 14 } }
        }
      },
      devicePixelRatio: 2
    }
  });
}

// ===== Stock Trend Line Chart =====
const stockTrendElem = document.getElementById('stockTrendChart');
if (stockTrendElem) {
  const stockTrendCtx = stockTrendElem.getContext('2d');
  const stockTrendChart = new Chart(stockTrendCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Stock Trend',
        data: [200, 180, 220, 160, 190],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#36A2EB'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: '#333',
          titleColor: '#fff',
          bodyColor: '#fff',
        }
      },
      scales: {
        y: { 
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' } 
        },
        x: { 
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { color: '#333', font: { size: 14 } }
        }
      },
      devicePixelRatio: 2
    }
  });
}


/////////// clock///////////



function updateClock() {
  const now = new Date();

  // === Digital Clock ===
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  document.getElementById('clock-time').textContent = `${hours}:${minutes}:${seconds}`;

  // Date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('clock-date').textContent = now.toLocaleDateString(undefined, options);

  // === Analog Clock ===
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;
  ctx.translate(radius, radius);

  // Clear
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

  // Clock face (dark mode)
  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#202528";
  ctx.fill();
  ctx.strokeStyle = "#edeffd";
  ctx.lineWidth = 5;
  ctx.stroke();

  // Numbers (soft white)
  ctx.font = radius * 0.15 + "px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "#edeffd";
  for (let num = 1; num <= 12; num++) {
    let ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.8);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.8);
    ctx.rotate(-ang);
  }

  // Hands (bright for hour/minute, red for second)
  function drawHand(pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  // Hour hand
  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let hourPos = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60);
  drawHand(hourPos, radius * 0.5, 6, "#edeffd");

  // Minute hand
  let minutePos = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(minutePos, radius * 0.7, 4, "#a3bdcc");

  // Second hand
  let secondPos = (second * Math.PI) / 30;
  drawHand(secondPos, radius * 0.8, 2, "#FF0060");

  ctx.translate(-radius, -radius); // reset for next frame
}

document.addEventListener('DOMContentLoaded', function() {
  setInterval(updateClock, 1000);
  updateClock();
});
