
// Multi Dataset Chart (Revenue, Assets, Earnings)
const ctx = document.getElementById('overviewChart').getContext('2d');

const overviewChart = new Chart(ctx, {
    type: 'line', // can also use 'bar'
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Sales Revenue ($)',
                data: [12000, 19000, 3000, 5000, 20000, 30000],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Total Net Worth ($)',
                data: [50000, 52000, 53000, 54000, 56000, 60000],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Monthly Income Earnings ($)',
                data: [8000, 12000, 15000, 10000, 25000, 28000],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#edeffd' } // soft white
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#edeffd' } // soft white
            },
            x: {
                ticks: { color: '#edeffd' } // soft white
            }
        }
    }
});




//////////

const sidebarSalesCtx = document.getElementById('sidebarSalesChart').getContext('2d');

const sidebarSalesChart = new Chart(sidebarSalesCtx, {
    type: 'doughnut',
    data: {
        labels: ['Completed Sales', 'Pending Sales', 'Cancelled Sales'],
        datasets: [{
            data: [60, 25, 15],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(255, 99, 132)'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#edeffd', boxWidth: 12, padding: 10 } // soft bright
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let total = context.chart.data.datasets[0].data.reduce((a,b) => a + b, 0);
                        let value = context.raw;
                        let percentage = ((value / total) * 100).toFixed(1) + '%';
                        return context.label + ': ' + value + ' (' + percentage + ')';
                    }
                }
            },
            // Plugin to draw the percentage in the middle
            beforeDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                ctx.restore();
                
                const fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = '#edeffd'; // soft bright for text

                // Get dataset and total
                const data = chart.data.datasets[0].data;
                const total = data.reduce((a,b) => a + b, 0);

                // Get active segment (hovered) or default to first
                let activeIndex = chart.getActiveElements()[0]?.index ?? 0;
                const value = data[activeIndex];
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                const text = percentage;

                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }
    }
});





/////////////////////////////////////////



const incomeCtx = document.getElementById('incomeTrendChart').getContext('2d');

// Example data
const incomeData = {
    day: [120, 200, 150, 180, 250, 300, 220],       // income each hour or day
    month: [4000, 4500, 4200, 4700, 5000, 5200, 5300],
    year: [50000, 52000, 54000, 56000, 60000, 62000, 65000]
};

const labels = {
    day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    month: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
    year: ['2019','2020','2021','2022','2023','2024','2025']
};

let currentRange = 'day';

// Initialize Chart
let incomeTrendChart = new Chart(incomeCtx, {
    type: 'line',
    data: {
        labels: labels[currentRange],
        datasets: [{
            label: 'Income ($)',
            data: incomeData[currentRange],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { 
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { color: '#edeffd' } // soft bright
            },
            y: { 
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { color: '#edeffd' } // soft bright
            }
        }
    }
});

// Handle time range buttons
document.querySelectorAll('.time-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.time-filters button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRange = btn.dataset.range;

        incomeTrendChart.data.labels = labels[currentRange];
        incomeTrendChart.data.datasets[0].data = incomeData[currentRange];
        incomeTrendChart.update();
    });
});




/////////////////



// ===== Order Statistics Bar Chart =====
const orderStatisticsBarCtx = document
    .getElementById('orderStatisticsBarCanvas')
    .getContext('2d');

let orderStatisticsBarChart = new Chart(orderStatisticsBarCtx, {
    type: 'bar',
    data: {
        labels: ['Shirts', 'Pants', 'Shoes', 'Jackets', 'Hats'],
        datasets: [{
            label: 'Stock Quantity',
            data: [120, 80, 150, 60, 40], // Example stock numbers
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: '#edeffd', // soft bright for x-axis labels (Chart.js v2)
                    color: '#edeffd', // soft bright for x-axis labels (Chart.js v3+)
                    fontStyle: 'bold',
                    fontSize: 14
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: '#edeffd', // soft bright for y-axis numbers (Chart.js v2)
                    color: '#edeffd', // soft bright for y-axis numbers (Chart.js v3+)
                    fontStyle: 'bold',
                    fontSize: 14
                },
                beginAtZero: true
            }]
        }
    }
});


///////////////////////




