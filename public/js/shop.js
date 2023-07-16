function producthash() {

    var hashData = window.location.hash.substr(1);

    productsCat(hashData)
}
setTimeout(() => {
    producthash()
}, 500);
$(document).ready(function() {

    $('.product-categorias li').click(function() {
        // Remover as classes de todos os li's
        $('.product-categorias li').removeClass('bg-dark text-white');

        // Adicionar classes ao li clicado
        $(this).addClass('bg-dark text-white');
    });

});

document.addEventListener("DOMContentLoaded", products())


function products() {

    fetch('./marloscardosoprodutos')
        .then(response => response.json())
        .then(produtos => {

            if (produtos.length === 0) {
                const mensagem = $('<p>').text('Nenhum produto disponível.');
                listaProdutos.append(mensagem);
            } else {
                document.querySelector("#list-products").innerHTML = ''
                produtos.forEach(produto => {

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
                                        $('<a>').addClass('d-block').attr('href', 'detail#' + produto.title).append(
                                            $('<img>').addClass('img-fluid w-100').attr('src', productImageSrc).attr('alt', '...')
                                        ),
                                        $('<div>').addClass('product-overlay').append(
                                            $('<ul>').addClass('mb-0 list-inline').append(


                                                $('<li>').addClass('list-inline-item me-0').on('click', productview).append(
                                                    $('<a>').addClass('btn btn-sm btn-outline-dark').attr('href', '#productView').attr('data-bs-toggle', 'modal').append(
                                                        $('<i>').addClass('fas fa-expand')
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    $('<h6>').append(
                                        $('<a>').addClass('reset-anchor').attr('href', 'detail#' + produto.title).text(productName)
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
}



setTimeout(() => {
    console.log(products())
}, 500);

function productsCat(categoria) {

    fetch('./marloscardosoprodutos')
        .then(response => response.json())
        .then(produtos => {

            if (produtos.length === 0) {
                const mensagem = $('<p>').text('Nenhum produto disponível.');
                listaProdutos.append(mensagem);
            } else {
                document.querySelector("#list-products").innerHTML = ''
                produtos.forEach(produto => {

                    $(document).ready(function() {
                        if (produto.categoria == categoria) {
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
                                            $('<a>').addClass('d-block').attr('href', 'detail#' + produto.titile).append(
                                                $('<img>').addClass('img-fluid w-100').attr('src', productImageSrc).attr('alt', '...')
                                            ),
                                            $('<div>').addClass('product-overlay').append(
                                                $('<ul>').addClass('mb-0 list-inline').append(


                                                    $('<li>').addClass('list-inline-item me-0').on('click', productview).append(
                                                        $('<a>').addClass('btn btn-sm btn-outline-dark').attr('href', '#productView').attr('data-bs-toggle', 'modal').append(
                                                            $('<i>').addClass('fas fa-expand')
                                                        )
                                                    )
                                                )
                                            )
                                        ),
                                        $('<h6>').append(
                                            $('<a>').addClass('reset-anchor').attr('href', 'detail').text(productName)
                                        ),
                                        $('<p>').addClass('small text-muted').text(productPrice)
                                    )
                                )
                            );
                        } else {
                            const mensagem = $('<p>').text('Nenhum produto disponível nesta categoria.');
                        }
                    });

                    // Função chamada quando o item é clicado
                    function productview() {

                        document.querySelector("#product-title").innerHTML = produto.title
                        document.querySelector("#product-description").innerHTML = produto.description
                        document.querySelector("#product-price").innerHTML = 'R$' + produto.price
                        $('#product-image').css('background-image', 'url(' + produto.image + ')');
                        setTimeout(() => {


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

                        }, 200);
                    }

                })

            }

        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
            document.querySelector("#list-products").innerHTML = `
            <span style="color:red;">Erro ao procurar produtos</span>
    
    
            `
        })
}

$(document).ready(function() {

    // Fazer a requisição utilizando fetch
    fetch('/marloscardosocategorias')
        .then(response => response.json()) // Parsear a resposta como JSON
        .then(data => {
            // Criar o elemento <div> com classe "categoria" e conteúdo

            for (var i = 0; i < data.length; i++) {
                (function(index) {
                    var li = $('<li>').addClass('py-2 px-4 categoria mb-3');
                    li.on('click', function() {
                        // Código da função a ser executada quando o li for clicado
                        productsCat(data[index].title);
                        // Outras ações que você deseja executar quando o li for clicado...
                    });
                    var strong = $('<strong>').addClass('small text-uppercase fw-bold').text(data[index].title);
                    li.append(strong);
                    $('#product-categorias').append(li);
                })(i);
            }


        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
});