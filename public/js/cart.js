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

        document.querySelector("#total-price").innerHTML = 'R$' + total

    }

    // Exemplo de uso da função
    somarValoresPriceLocalStorage();



    // Percorrer a lista de produtos
    produtos.forEach(function(produto, indice) {
        // Criar o elemento <tr> com os dados do produto
        const tr = $('<tr>').append(
            $('<th>').addClass('ps-0 py-3 border-light').attr('scope', 'row').append(
                $('<div>').addClass('d-flex align-items-center').append(
                    $('<a>').addClass('reset-anchor d-block animsition-link').attr('href', 'detail').append(
                        $('<img>').attr('src', produto.image).attr('alt', '...').attr('width', '70')
                    ),
                    $('<div>').addClass('ms-3').append(
                        $('<strong>').addClass('h6').append(
                            $('<a>').addClass('reset-anchor animsition-link').attr('href', 'detail').text(produto.title)
                        )
                    )
                )
            ),
            $('<td>').addClass('p-3 align-middle border-light').append(
                $('<p>').addClass('mb-0 small').text('R$' + produto.price)
            ),

            $('<td>').addClass('p-3 align-middle border-light').append(
                $('<a>').addClass('reset-anchor delete-link').attr('href', '#').data('indice', indice).append(
                    $('<i>').addClass('fas fa-trash-alt small text-muted')
                )

            )

        );
        tr.find('.delete-link').on('click', function() {


                try {
                    //codigo para apagar dados
                    excluirCart(produto.token)

                    // Exibir a modal de sucesso com SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Item removido do carrinho',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1550);
                } catch (error) {
                    // Exibir a modal de erro com SweetAlert
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao remover item do carrinho',
                        text: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }



            })
            // Adicionar o elemento <tr> à tabela desejada
        $('#table-products').append(tr);


        // Exibir o título e o índice no console

    });
});


function excluirCart(token) {
    if (typeof localStorage !== 'undefined') {
        const savedData = JSON.parse(localStorage.getItem('Cart')) || [];
        const indexToRemove = savedData.findIndex(objeto => objeto.token === token);
        if (indexToRemove !== -1) {
            savedData.splice(indexToRemove, 1);
            localStorage.setItem('Cart', JSON.stringify(savedData));
            console.log(savedData);
        } else {
            console.log('Não foi encontrado nenhum objeto com a idade especificada.');
        }
    } else {
        console.log('O localStorage não é suportado neste navegador.');
    }
}


function finalizar() {
    let timerInterval
    Swal.fire({
        title: 'Finalizando Seu Pedido!',
        html: 'Aguarde 🕒',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()

        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            // Função para gerar o link do WhatsApp com o número e mensagem
            function gerarLinkWhatsApp(numeroTelefone, mensagem) {
                const linkWhatsApp = `https://api.whatsapp.com/send?phone=${encodeURIComponent(numeroTelefone)}&text=${encodeURIComponent(mensagem)}`;
                return linkWhatsApp;
            }

            // Exemplo de uso

            const savedData = JSON.parse(localStorage.getItem('Cart')) || [];

            const titles = savedData.map(objeto => objeto.title + ' R$' + objeto.price);

            const dataHoraAtual = moment();
            const formatoDesejado = 'DD/MM/YYYY HH:mm';
            const dataHoraFormatada = dataHoraAtual.format(formatoDesejado);



            const total = savedData.map(objeto => objeto.price)
                .reduce((acumulador, valorAtual) => acumulador + parseFloat(valorAtual), 0);

            const numeroTelefone = '+5574991379747'; // Substitua pelo número de telefone desejado
            const mensagem = `
        *Produtos:* ` + titles + `
        *Valor Total:* R$` + total + `
        *Pedido realizado:* ` + dataHoraFormatada + `
        `
            const linkWhatsApp = gerarLinkWhatsApp(numeroTelefone, mensagem);
            window.open(linkWhatsApp, '_blank');
        }
    })


}