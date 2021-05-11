var ctx = document.getElementById('graph');
var graph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['blue', 'green', 'yellow', 'purple', 'pink', 'orange'],
        datasets: [{
            label: '${`BitCoin`}',
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
