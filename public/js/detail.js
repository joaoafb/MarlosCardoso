function loadpage() {
    const hash = window.location.hash.substring(1);
    const decodedHash = decodeURIComponent(hash);
    fetch('http://54.224.146.242/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.titulo == decodedHash) {
                    // Ajustar o acesso correto às propriedades do item
                    const produto = item;

                    document.querySelector("#product-title").innerHTML = produto.titulo;
                    document.querySelector("#product-price").innerHTML = 'R$' + produto.valor;
                    document.querySelector("#product-description").innerHTML = produto.descricao;
                    document.querySelector("#product-id").innerHTML = produto._id;
                    document.querySelector("#product-category").innerHTML = produto.categoria;
                    document.querySelector("#product-modelo").innerHTML = produto.modelo;

                    const btn = document.createElement("button");
                    btn.style.width = "100%";
                    btn.className = "btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center  px-0";
                    btn.style.height = '50px'

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
                            const jsonData = { image: produto.img, title: produto.titulo, price: produto.valor, token: produto._id };

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
                                location.href = 'cart.html'
                            }
                        })
                    };

                    const btnback = document.createElement("button")
                    btnback.className = 'btn btn-outline-dark btn-sm'

                    btnback.textContent = 'Voltar ao catálogo'
                    btnback.onclick = function() {
                        history.back()
                    }

                    const btnshare = document.createElement("button")
                    btnshare.className = 'btn btn-outline-dark btn-sm'
                    btnshare.textContent = 'Compartilhar'

                    btnshare.style.marginLeft = '10px'
                    btnshare.onclick = function() {

                        const url = 'Conheça a Loja Marlos Cardoso! Estilo masculino elevado à máxima elegância. Link: ' + encodeURIComponent(window.location.href);
                        window.open(`https://wa.me/?text=${url}`, '_blank');

                    }
                    document.querySelector("#product-addcart").innerHTML = "";
                    document.querySelector("#product-addcart").appendChild(btn);
                    document.querySelector("#product-addcart").appendChild(btnback);
                    document.querySelector("#product-addcart").appendChild(btnshare);

                    document.querySelector("#product-img2").src = produto.img

                    document.querySelector("#product-img2").src = produto.img;
                }
            });
        })
        .catch(error => {
            // Lida com erros da solicitação fetch, se houver
            console.error('Ocorreu um erro:', error);
        });
}

// Use o evento 'DOMContentLoaded' e passe uma referência da função, em vez de executá-la
document.addEventListener("DOMContentLoaded", loadpage);