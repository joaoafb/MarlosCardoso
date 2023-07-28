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

            if (localStorage.getItem("cpf").length > 5) {
                document.querySelector("#cpf").value = localStorage.getItem("usercpf")
            }


            function obterEndereco(latitude, longitude) {
                const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {

                        document.getElementById("rua").textContent = data.address.road || "-";
                        document.getElementById("addressalt").value = data.address.suburb || "-";
                        document.getElementById("city").value = data.address.city || "-";
                        document.getElementById("state").value = data.address.state || "-";
                    })
                    .catch(error => {
                        console.error("Erro ao obter informações de endereço:", error);
                    });
            }

            // Exemplo: Obtendo a localização do usuário
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;



                    obterEndereco(latitude, longitude);
                });
            } else {
                console.error("Geolocalização não suportada pelo navegador.");
            }
        });
        // Adicionar o elemento <tr> à tabela desejada



        // Exibir o título e o índice no console

    });
});



document.getElementById('firstName').value = localStorage.getItem("userstore")
document.querySelector("#form").addEventListener("submit", function(event) {
        event.preventDefault()
        document.querySelector("#btnComprar").disabled = true

        const firstNameInput = document.getElementById('firstName').value

        const lastNameInput = document.getElementById('lastName').value
        const emailInput = document.getElementById('email').value
        const phoneInput = document.getElementById('phone').value
        const addressInput = document.getElementById('address').value
        const addressAltInput = document.getElementById('addressalt').value
        const cityInput = document.getElementById('city').value
        const stateInput = document.getElementById('state').value
        const cpf = document.getElementById('cpf').value
        localStorage.setItem("usercpf", cpf)
        const pedido = JSON.parse(localStorage.getItem('Cart')) || [];


        const dataHoraAtual = moment();
        const formatoDesejado = 'DD/MM/YYYY HH:mm';
        const dataHoraFormatada = dataHoraAtual.format(formatoDesejado);
        // Envia os dados para o servidor usando o fetch
        function generateToken() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const tokenLength = 10;
            let token = '';

            for (let i = 0; i < tokenLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                token += characters[randomIndex];
            }

            return token;
        }

        // Exemplo de uso:
        const tokenp = generateToken();


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

            token: tokenp,
            pricetotal: sessionStorage.getItem("pricetotal"),
            status: 'Aguardando Pagamento',
            data: dataHoraFormatada
        }
        fetch("https://100.24.182.107/api/marloscardoso/addpedidos", {
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
                        showButtonConfirm: false,
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