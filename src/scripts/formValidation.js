import IMask from 'imask'

const phoneMask = IMask(document.getElementById('phone'), {
	mask: '+375(00)000-00-00',
})

export function initFormValidation() {
	const form = document.getElementById('feedbackForm')
	const nameInput = document.getElementById('name')
	const emailInput = document.getElementById('email')
	const phoneInput = document.getElementById('phone')
	const messageInput = document.getElementById('message')
	const formMessage = document.getElementById('formMessage')

	form.addEventListener('submit', async e => {
		e.preventDefault()
		if (validateForm()) {
			const formData = new FormData(form)
			try {
				const response = await fetch('test', {
					method: 'POST',
					body: formData,
				})

				const result = await response.json()

				if (result.status === 'success') {
					formMessage.textContent = 'Ваша заявка успешно отправлена'
					formMessage.className = 'form-message success'
					form.reset()
					phoneMask.value = ''
				} else if (result.status === 'error') {
					for (const [field, message] of Object.entries(result.fields)) {
						showError(document.getElementById(field), `${field}Error`, message)
					}
					formMessage.textContent = 'Пожалуйста, исправьте ошибки в форме'
					formMessage.className = 'form-message error'
				}
			} catch (error) {
				console.error('Error:', error)
				formMessage.textContent =
					'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.'
				formMessage.className = 'form-message error'
			}
		}
	})

	clearErrors()

	function validateForm() {
		let isValid = true

		if (!nameInput.value.trim()) {
			showError(nameInput, 'Пожалуйста, введите ваше имя')
			isValid = false
		} else if (!isValidName(nameInput.value)) {
			showError(nameInput, 'Пожалуйста, введите корректное имя')
			isValid = false
		} else {
			hideError(nameInput)
		}

		if (!emailInput.value) {
			showError(emailInput, 'Пожалуйста, введите ваш Email')
			isValid = false
		} else if (!isValidEmail(emailInput.value)) {
			showError(emailInput, 'Пожалуйста, введите корректный email')
			isValid = false
		} else {
			hideError(emailInput)
		}

		if (!phoneInput.value.trim()) {
			showError(phoneInput, 'Пожалуйста, введите ваш телефон')
			isValid = false
		} else {
			hideError(phoneInput)
		}

		if (!messageInput.value.trim()) {
			showError(messageInput, 'Пожалуйста, введите ваше сообщение')
			isValid = false
		} else {
			hideError(messageInput)
		}

		return isValid
	}

	function showError(input, message) {
		const errorElement = document.getElementById(`${input.id}Error`)
		errorElement.textContent = message
		input.classList.add('error')
	}

	function hideError(input) {
		const errorElement = document.getElementById(`${input.id}Error`)
		errorElement.textContent = ''
		input.classList.remove('error')
	}

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	function isValidName(name) {
		const nameRegex = /^[A-Za-zА-Яа-яЁё\-\s]+$/
		return nameRegex.test(name)
	}

	function clearErrors() {
		const errorElement = document.querySelectorAll('.error-message')
		const inputs = form.querySelectorAll('input, textarea')

		errorElement.forEach(error => (error.textContent = ''))
		inputs.forEach(input => input.classList.remove('error'))
	}
}
