document.addEventListener("DOMContentLoaded", function() {
    fetch(`http://54.224.146.242/api/marloscardoso/listapedidosuser?cpf=${localStorage.getItem("usercpf")}`)
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {

                const newRow = $('<tr>');
                item.pedido.forEach(pedido => {
                    newRow.append($('<td>').attr("style", "display:flex;flex-direction:column;").text(pedido.title))
                })


                newRow.append($('<td>').text(item.keypedido));
                newRow.append($('<td>').text(item.status));
                newRow.append($('<td>').text('R$' + item.pricetotal));
                newRow.append($('<td>').text(item.data));
                const btntr = document.createElement("td")
                const button = document.createElement("button")
                button.textContent = 'Pagar Agora'
                button.className = 'btn btn-dark'
                button.onclick = function() {
                    window.location.href = 'https://wa.me/5574991379747?text=Quero finalizar o pagamento do pedido ID:' + item._id
                }
                btntr.append(button)
                newRow.append(btntr)
                $('#table').append(newRow);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})