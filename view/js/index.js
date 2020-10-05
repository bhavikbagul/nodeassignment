const imdbForm = document.querySelector('form')
const ncost = form.querySelector('input[name="ncost"]').value
const primaryName = form.querySelector('input[name="primaryName"]').value
const birthYear = form.querySelector('input[name="birthYear"]').value
const deathYear = form.querySelector('input[name="deathYear"]').value
const primaryProfession = form.querySelector('input[name="primaryProfession"]').value
const knownForTitles = form.querySelector('input[name="knownForTitles"]').value

imdbForm.addEventListener('submit',(e) => {
	e.preventDefault()
})
