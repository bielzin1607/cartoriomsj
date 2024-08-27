document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item button');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
        });
    });
});


function buscar(event, formId) {
    event.preventDefault(); // Prevenir a submissão padrão do formulário
    var form = $('#' + formId);
    var query = form.find('input[name="query"]').val();
    console.log(`Form ID: ${formId}, Query: ${query}`);  // Adicione esta linha
    $.ajax({
        url: '/buscar',
        type: 'POST',
        data: { query: query },
        success: function(data) {
            console.log("Data received:", data);  // Adicione esta linha
            var resultsDiv = $('#results');
            resultsDiv.empty();
            if (data.length > 0) {
                var ul = $('<ul>');
                data.forEach(function(item) {
                    ul.append('<li>' + item[1] + ': ' + item[2] + '</li>');
                });
                resultsDiv.append(ul);
            } else {
                resultsDiv.append('<p>No results found</p>');
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Adiciona o evento de clique ao botão enviar
    document.querySelector(".chat-input button").addEventListener("click", sendMessage);

    // Adiciona o evento de pressionar 'Enter' no campo de texto
    document.querySelector("#user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function sendMessage() {
    var userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    // Adiciona a mensagem do usuário no chat
    addMessage(userInput, "user-message");

    // Gera uma resposta automática do bot
    var botResponse = getBotResponse(userInput);
    setTimeout(function() {
        addMessage(botResponse, "bot-message");
    }, 1000); // Simula um atraso de 1 segundo

    // Limpa o campo de entrada
    document.getElementById("user-input").value = "";
}

function addMessage(text, className) {
    var chatBody = document.getElementById("chat-body");
    var messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Rolagem automática para o final do chat
}

function getBotResponse(input) {
    // Respostas simples baseadas em palavras-chave
    input = input.toLowerCase();
    if (input.includes("olá") || input.includes("oi")) {
        return "Olá! Como posso te ajudar?";
    } else if (input.includes("serviço")) {
        return "Oferecemos serviços como registro de imóveis, contratos, e certidões. Como posso te ajudar mais?";
    } else if (input.includes("horário")) {
        return "Nosso horário de funcionamento é de segunda a sexta, das 8h às 17h.";
    } else {
        return "Desculpe, não entendi. Pode reformular a pergunta?";
    }
}
