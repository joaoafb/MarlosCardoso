document.addEventListener("DOMContentLoaded", function() {
    function obterProdutosDoLocalStorage() {
        // Verificar se existem produtos salvos no localStorage
        const produtosSalvos = localStorage.getItem('Cart');

        // Se não houver produtos salvos, retornar um array vazio
        if (!produtosSalvos) {
            return [];
        }

        // Converter a string JSON em um objeto
        const produtosObjeto = JSON.parse(produtosSalvos);

        // Retornar os produtos como um array
        return Object.values(produtosObjeto);
    }


    // Chamar a função para obter os produtos do localStorage
    const produtos = obterProdutosDoLocalStorage();

    // Função para somar os valores da propriedade "price" de todos os objetos no array
    function somarValoresPriceLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

        const total = savedData.map(objeto => objeto.price)
            .reduce((acumulador, valorAtual) => acumulador + parseFloat(valorAtual), 0);
        sessionStorage.setItem("pricetotal", total);

        // Cria a estrutura HTML
        const listItem = $('<li>').addClass('d-flex align-items-center justify-content-between');
        const strongElement = $('<strong>').addClass('small fw-bold').text('TOTAL');
        const spanElement = $('<span>').addClass('text-muted small').text('R$' + total);
        const borderLine = $('<li>').addClass('border-bottom my-2');

        // Adiciona os elementos à lista
        $('#order').append(listItem.append(strongElement, spanElement), borderLine);
    }


    // Exemplo de uso da função
    somarValoresPriceLocalStorage();



    // Percorrer a lista de produtos
    produtos.forEach(function(produto, indice) {
        // Criar o elemento <tr> com os dados do produto







        // Usando o método .append() para adicionar elementos à lista
        $(document).ready(function() {
            // Cria a estrutura HTML
            const listItem = $('<li>').addClass('d-flex align-items-center justify-content-between');
            const strongElement = $('<strong>').addClass('small fw-bold').text(produto.title);
            const spanElement = $('<span>').addClass('text-muted small').text('R$' + produto.price);
            const borderLine = $('<li>').addClass('border-bottom my-2');

            // Adiciona os elementos à lista
            $('#order').append(listItem.append(strongElement, spanElement), borderLine);
        });
        // Adicionar o elemento <tr> à tabela desejada



        // Exibir o título e o índice no console

    });
});



document.getElementById('firstName').value = localStorage.getItem("userstore")
document.querySelector("#form").addEventListener("submit", function(event) {
        event.preventDefault()

        const firstNameInput = document.getElementById('firstName').value

        const lastNameInput = document.getElementById('lastName').value
        const emailInput = document.getElementById('email').value
        const phoneInput = document.getElementById('phone').value
        const addressInput = document.getElementById('address').value
        const addressAltInput = document.getElementById('addressalt').value
        const cityInput = document.getElementById('city').value
        const stateInput = document.getElementById('state').value
        const cpf = document.getElementById('cpf').value
        const pedido = JSON.parse(localStorage.getItem('Cart')) || [];


        const dataHoraAtual = moment();
        const formatoDesejado = 'DD/MM/YYYY HH:mm';
        const dataHoraFormatada = dataHoraAtual.format(formatoDesejado);
        // Envia os dados para o servidor usando o fetch
        const Pedido = {
            pedido,
            firstNameInput,
            lastNameInput,
            emailInput,
            phoneInput,
            addressInput,
            addressAltInput,
            cityInput,
            cpf,
            stateInput,
            token: localStorage.getItem("token"),
            pricetotal: sessionStorage.getItem("pricetotal"),
            status: 'Aguardando Pagamento',
            data: dataHoraFormatada
        }
        fetch("http://54.224.146.242/api/marloscardoso/addpedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Pedido)
            })
            .then(response => response.json())
            .then(data => {

                if (data.message == 'Pedido Cadastrado') {

                    let timerInterval
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido Realizado',
                        html: 'Redirencionando para página de pagamento!',
                        timer: 2000,
                        timerProgressBar: true,

                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            localStorage.removeItem("Cart");

                            location.href = 'pedidos.html'



                        }
                    })
                }
                // Aqui você pode realizar alguma ação após o servidor processar os dados
            })
            .catch(error => {
                console.error("Erro ao enviar dados:", error);
            });



    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });