fetch('ftc.md')
    .then(response => response.text())
    .then(data => {
        document.getElementById('content').innerHTML = marked.parse(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });