function loadRepos() {
	const username = document.getElementById('username').value;
	const ulEl = document.getElementById('repos');
	let url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
			return res.json();
		})
		.then(handleResponse)
		.catch(handleError);

	function handleResponse(data) {
		ulEl.innerHTML = '';
		// ulEl.replaceChildren('');
		for (let repo of data) {
			const liEl = document.createElement('li');
			liEl.innerHTML = `<a href="${repo.html_url}">
                ${repo.full_name}
            </a>`;
			ulEl.appendChild(liEl);
		}
	}

	function handleError(error) {
		ulEl.replaceChildren('');
		ulEl.textContent = `${error.message}`;
	}
}