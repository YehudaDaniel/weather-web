const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const success = document.querySelector('.success');
const error = document.querySelector('.error');

weatherForm.addEventListener('submit',e => {
    e.preventDefault();

    success.innerHTML = 'Loading...';
    error.innerHTML = '';

    fetch('/weather?address='+search.value).then(res => {
        res.json().then(data => {
            if(data.err){
                error.innerHTML = data.err;
            }else{
                success.innerHTML = data.location + '</br>' + data.forecast;
            }

        });
    });
});