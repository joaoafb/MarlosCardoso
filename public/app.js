// Verificar se o cliente já acessou a página
if (localStorage.getItem('acesso')) {
    // O cliente já acessou a página antes, exiba o token armazenado no localStorage
    const token = localStorage.getItem('token');
    console.log('Token do cliente:', token);
} else {
    // É a primeira vez que o cliente está acessando a página
    console.log('Cliente está acessando a página pela primeira vez.');
    localStorage.setItem("indice", 0)

    // Gerar um novo token
    const token = generateToken();
    console.log('Novo token gerado:', token);

    // Armazenar o novo token no localStorage
    localStorage.setItem('token', token);

    // Armazenar um valor indicando que o cliente já acessou a página
    localStorage.setItem('acesso', true);
}

// Função para gerar um token único
function generateToken() {
    // Implemente a lógica para gerar o token único
    // Aqui está um exemplo simples usando um timestamp e um número aleatório
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    const token = `${timestamp}-${randomNumber}`;
    return token;
}



function teste() {
    alert("dsd")
}
fetch('./marloscardosoprodutos')
    .then(response => response.json())
    .then(produtos => {

        if (produtos.length === 0) {
            const mensagem = $('<p>').text('Nenhum produto disponível.');
            listaProdutos.append(mensagem);
        } else {
            produtos.forEach(produto => {
                console.log(produto.token)
                $(document).ready(function() {
                    // Dados a serem inseridos no HTML
                    var productName = produto.title
                    var productPrice = 'R$' + produto.price
                    var productImageSrc = produto.image


                    // Criando o elemento HTML com os dados dinâmicos usando o método append do jQuery
                    $('#list-products').append(
                        $('<div>').addClass('col-xl-3 col-lg-4 col-sm-6').append(
                            $('<div>').addClass('product text-center').append(
                                $('<div>').addClass('position-relative mb-3').append(
                                    $('<div>').addClass('badge text-white bg-'),
                                    $('<a>').addClass('d-block').attr('href', 'detail#' + productName).append(
                                        $('<img>').addClass('img-fluid w-100').attr('src', productImageSrc).attr('alt', '...')
                                    ),
                                    $('<div>').addClass('product-overlay').append(
                                        $('<ul>').addClass('mb-0 list-inline').append(
                                            $('<li>').addClass('list-inline-item m-0 p-0').append(

                                            ),
                                            // Criar o elemento <li> e adicionar evento de clique a ele
                                            $('<li>').on('click', function() {
                                                // Executar a função desejada ao clicar no elemento
                                                var carrinho = produto;

                                                // Converte a array em uma string JSON
                                                var carrinhoString = JSON.stringify(carrinho);

                                                // Salva a string no LocalStorage com a chave "carrinho"
                                                localStorage.setItem('carrinho', carrinhoString);


                                                const indice = Number(localStorage.getItem("indice"))
                                                localStorage.setItem("indice", indice + 1)
                                                    // Verificar se o localStorage está disponível no navegador
                                                if (typeof localStorage !== 'undefined') {
                                                    // Obter os dados salvos no localStorage (se houver)
                                                    const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

                                                    // Definir o objeto JSON a ser salvo
                                                    const jsonData = { image: produto.image, title: produto.title, price: produto.price, token: produto.token };

                                                    // Adicionar o novo objeto JSON ao array
                                                    savedData.push(jsonData);

                                                    // Salvar o array atualizado no localStorage
                                                    localStorage.setItem('Cart', JSON.stringify(savedData));

                                                    // Exibir o array atualizado no console
                                                    console.log(savedData);
                                                } else {
                                                    console.log('O localStorage não é suportado neste navegador.');
                                                }


                                                let timerInterval
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Adicionado No Carrinho Com Sucesso!',
                                                    html: 'Redirecionando ao carrinho...',
                                                    timer: 2000,
                                                    timerProgressBar: true,
                                                    didOpen: () => {
                                                        Swal.showLoading()
                                                        const b = Swal.getHtmlContainer().querySelector('b')

                                                    },
                                                    willClose: () => {
                                                        clearInterval(timerInterval)
                                                    }
                                                }).then((result) => {
                                                    /* Read more about handling dismissals below */
                                                    if (result.dismiss === Swal.DismissReason.timer) {
                                                        location.href = '/cart'
                                                    }
                                                })

                                            })
                                            .addClass('list-inline-item m-0 p-0') // Adicionar as classes ao elemento <li>
                                            .append( // Adicionar o elemento <a> como filho do elemento <li>
                                                $('<span>').addClass('btn btn-sm btn-dark').attr('href', 'cart').text('Adicionar no Carrinho')
                                            )
                                            .appendTo('body'),
                                            $('<li>').addClass('list-inline-item me-0').on('click', productview).append(
                                                $('<a>').addClass('btn btn-sm btn-outline-dark').attr('href', '#productView').attr('data-bs-toggle', 'modal').append(
                                                    $('<i>').addClass('fas fa-expand')
                                                )
                                            )
                                        )
                                    )
                                ),
                                $('<h6>').append(
                                    $('<a>').addClass('reset-anchor').attr('href', 'detaildsd').text(productName)
                                ),
                                $('<p>').addClass('small text-muted').text(productPrice)
                            )
                        )
                    );
                });

                // Função chamada quando o item é clicado
                function productview() {
                    document.querySelector("#product-title").innerHTML = produto.title
                    document.querySelector("#product-description").innerHTML = produto.description
                    document.querySelector("#product-price").innerHTML = 'R$' + produto.price
                    $('#product-image').css('background-image', 'url(' + produto.image + ')');
                    document.querySelector("#btn-addcart button").onclick = function() {

                        // Executar a função desejada ao clicar no elemento
                        var carrinho = produto;

                        // Converte a array em uma string JSON
                        var carrinhoString = JSON.stringify(carrinho);

                        // Salva a string no LocalStorage com a chave "carrinho"
                        localStorage.setItem('carrinho', carrinhoString);


                        const indice = Number(localStorage.getItem("indice"))
                        localStorage.setItem("indice", indice + 1)
                            // Verificar se o localStorage está disponível no navegador
                        if (typeof localStorage !== 'undefined') {
                            // Obter os dados salvos no localStorage (se houver)
                            const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

                            // Definir o objeto JSON a ser salvo
                            const jsonData = { image: produto.image, title: produto.title, price: produto.price, token: produto.token };

                            // Adicionar o novo objeto JSON ao array
                            savedData.push(jsonData);

                            // Salvar o array atualizado no localStorage
                            localStorage.setItem('Cart', JSON.stringify(savedData));

                            // Exibir o array atualizado no console
                            console.log(savedData);
                        } else {
                            console.log('O localStorage não é suportado neste navegador.');
                        }


                        let timerInterval
                        Swal.fire({
                            icon: 'success',
                            title: 'Adicionado No Carrinho Com Sucesso!',
                            html: 'Redirecionando ao carrinho...',
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading()
                                const b = Swal.getHtmlContainer().querySelector('b')

                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                location.href = '/cart'
                            }
                        })


                    }

                }

            });

        }

    })
    .catch(error => {
        console.error('Erro ao carregar os produtos:', error);
        document.querySelector("#list-products").innerHTML = `
        <span style="color:red;">Erro ao procurar produtos</span>


        `
    });