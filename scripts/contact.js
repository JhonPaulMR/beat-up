const BASE_API = 'http://localhost:3000/contacts';
const API_URL = `${BASE_API}?_sort=createdAt&_order=desc&_limit=3`;

function renderContacts(contacts) {
    const html = contacts.map(contact => `
    <div class="message-card">
        <div class="d-flex justify-content-between mb-2">
            <h6 class="text-white mb-0">${contact.name}</h6>
            <small class="text-muted">${new Date(contact.createdAt).toLocaleDateString()}</small>
        </div>
        <p class="text-white-50 mb-0">${contact.message}</p>
    </div>
`).join('');

    $('#contactsList').html(html || '<p class="text-white-50">Nenhuma mensagem recente</p>');
}

function showApiError(message) {
    $('#contactsList').html(`
    <div class="alert alert-danger">
        <i class="bi bi-exclamation-triangle"></i>
        ${message}
    </div>
`);
}

function loadContacts() {
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('API não respondeu');
            return res.json();
        })
        .then(renderContacts)
        .catch(error => {
            showApiError('Servidor de mensagens offline. Tente novamente mais tarde.');
            console.error('Erro API:', error);
        });
}

$(document).ready(() => {
    $('#phone').mask('(00) 00000-0000');
    loadContacts();
});

$('#contactForm').submit(async (e) => {
    e.preventDefault();

    const formData = {
        name: $('#contactForm input[type="text"]').val(),
        email: $('#contactForm input[type="email"]').val(),
        phone: $('#phone').val(),
        message: $('#contactForm textarea').val(),
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch(BASE_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Falha no envio');

        loadContacts();
        $('#contactForm')[0].reset();
        $('#toast').removeClass('hidden').delay(3000).fadeOut();
    } catch (error) {
        console.error('Erro:', error);
        $('#toast').removeClass('bg-success').addClass('bg-danger')
            .find('.toast-body').text('Erro ao enviar! Verifique o servidor.');
        $('#toast').removeClass('hidden').delay(3000).fadeOut();
    }
});