var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['blue', 'green', 'yellow', 'purple', 'pink', 'orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'blue',
                'green',
                'yellow',
                'purple',
                'pink',
                'orange'
            ],
            borderColor: [
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
