const subjects = ['maths', 'vmaths'];
const setName = (name) => {
    document.querySelector('.user-name').textContent = name;
}
const unlock = (subjects) => {
    subjects.forEach(subject => {
        const item = document.querySelector(`.${subject}`);
        item.classList.remove('lock');
        item.removeChild(item.children[1]);
        item.setAttribute('href', subject)
    })
}

setName('Testing User Name')
unlock(subjects);