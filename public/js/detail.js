function loadpage() {
    fetch('./marloscardosoprodutos')
        .then(response => response.json())
        .then(produtos => {
            const hash = window.location.hash.substring(1);

            const decodedHash = decodeURIComponent(hash);

            console.log(decodedHash); // Saída: "Gravata 1"

            produtos.forEach(produto => {
                if (decodedHash === produto.title) {


                    document.querySelector("#product-title").innerHTML = produto.title
                    document.querySelector("#product-price").innerHTML = 'R$' + produto.price
                    document.querySelector("#product-description").innerHTML = produto.description
                    document.querySelector("#product-id").innerHTML = produto.token
                    document.querySelector("#product-category").innerHTML = produto.categoria
                    document.querySelector("#product-modelo").innerHTML = produto.modelo
                    const btn = document.createElement("button");
                    btn.style.width = "100%";
                    btn.className = "btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center  px-0";

                    btn.innerText = "Adicionar ao carrinho";
                    btn.onclick = function() {
                        // Suponha que você tenha uma array chamada "carrinho"
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
                    };

                    document.querySelector("#product-addcart").innerHTML = "";
                    document.querySelector("#product-addcart").appendChild(btn);

                    document.querySelector("#product-img2").src = produto.image
                    productsCat(produto.categoria)

                } else {

                }
            })



        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });
}
document.addEventListener("DOMContentLoaded", loadpage())


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
                        if (produto.categoria == categoria & produto.title != document.querySelector("#product-title").textContent) {
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
                                            ).click(function() {
                                                // Código da função a ser executada quando o link for clicado
                                                setTimeout(() => {
                                                    window.location.reload()
                                                }, 100);
                                            }),


                                            $('<div>').addClass('product-overlay').append(
                                                $('<ul>').addClass('mb-0 list-inline').append(

                                                    $('<li>').addClass('list-inline-item m-0 p-0').append(
                                                        $('<a>').addClass('btn btn-sm btn-dark').attr('href', 'cart').text('Carrinho')
                                                    ),
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