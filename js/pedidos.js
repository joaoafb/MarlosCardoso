document.addEventListener("DOMContentLoaded", function() {
    fetch(`https://100.24.182.107/api/marloscardoso/listapedidosuser?cpf=${localStorage.getItem("usercpf")}`)
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {

                const newRow = $('<tr>');
                item.pedido.forEach(pedido => {
                    newRow.append($('<td>').attr("style", "display:flex;flex-direction:column;").text(pedido.title))
                })


                newRow.append($('<td>').text(item.token));
                newRow.append($('<td>').text(item.status));
                if (item.status == 'Pedido Postado') {
                    document.querySelector("#tdcod").style.display = 'block'
                    newRow.append($('<td>').text(item.codRastreio));
                } else {
                    newRow.append($('<td>').text('Não disponível'));
                }
                newRow.append($('<td>').text('R$' + item.pricetotal));
                newRow.append($('<td>').text(item.data));
                if (item.status == 'Aguardando Pagamento') {
                    const btntr = document.createElement("td")
                    const button = document.createElement("button")
                    button.textContent = 'Pagar Agora'
                    button.className = 'btn btn-dark'
                    button.onclick = function() {
                        // Coloque o código que você quer executar no cliente aqui

                        const link = item.linkPagamento; // Substitua pela URL do link que deseja abrir
                        window.open(link, '_blank');



                    }
                    btntr.append(button)
                    newRow.append(btntr)
                }
                if (item.status == 'Pedido Postado') {
                    const btntr = document.createElement("td")
                    const button = document.createElement("button")
                    button.textContent = 'Rastrear'
                    button.className = 'btn btn-dark'
                    button.onclick = function() {
                        window.open("https://linketrack.com/track?codigo=" + item.codRastreio + "&utm_source=footer", '_blank')



                    }
                    btntr.append(button)
                    newRow.append(btntr)
                }
                if (item.status == 'Compra Aprovada') {
                    const btntr = document.createElement("td")
                    const button = document.createElement("button")
                    button.textContent = 'Consultar Pedido'
                    button.className = 'btn btn-dark'
                    button.onclick = function() {
                        Swal.fire({

                            icon: 'info',
                            title: 'Serviço Indiponível no momento!',
                            showConfirmButton: false,
                            timer: 1500
                        })



                    }
                    btntr.append(button)
                    newRow.append(btntr)
                }
                $('#table').append(newRow);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})