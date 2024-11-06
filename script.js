$(document).ready(function() {
    // Função para formatar o telefone
    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length > 11) {
            telefone = telefone.slice(0, 11);
        }
        if (telefone.length > 2) {
            telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
        }
        if (telefone.length > 10) {
            telefone = `${telefone.slice(0, 10)}-${telefone.slice(10)}`;
        }
        return telefone;
    }

    // Mostrar a primeira aba por padrão
    $('.tab-content:first').addClass('active');

    // Alternar entre as abas
    $('.tab-link').click(function(e) {
        e.preventDefault();
        const tabId = $(this).attr('href');
        $('.tab-content').removeClass('active');
        $(tabId).addClass('active');
    });

    // Abrir pop-up de cadastro
    $('.cadastro-btn').click(function() {
        const projeto = $(this).data('projeto');
        $('#projeto-id').val(projeto);
        $('#cadastro-popup').show();
    });

    // Fechar pop-up
    $('#fechar-popup').click(function() {
        $('#cadastro-popup').hide();
    });

    // Validação do telefone no formulário de cadastro de projetos
    $('#telefone').on('input', function() {
        $(this).val(formatarTelefone($(this).val()));
    });

    // Enviar formulário de cadastro
    $('#cadastro-form').submit(function(e) {
        e.preventDefault();
        const projeto = $('#projeto-id').val();
        const nome = $('#nome').val();
        const email = $('#email').val();
        const telefone = $('#telefone').val();

        // Validação do telefone
        const telefoneNumeros = telefone.replace(/\D/g, '');
        if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
            alert('Por favor, insira um número de telefone válido (DDD + número).');
            return;
        }

        // Simular envio bem-sucedido
        console.log(`Cadastro para ${projeto}: ${nome}, ${email}, ${telefone}`);

        const contadorElement = $(`.inscritos-count[data-projeto="${projeto}"]`);
        let contador = parseInt(contadorElement.text());
        contador++;
        contadorElement.text(contador);

        $('#cadastro-popup').hide();
        $('#cadastro-form')[0].reset();

        alert('Cadastro realizado com sucesso!');
    });

    // Abrir pop-up de cadastro para viagem
    $('.comprar-passagem').click(function() {
        const destino = $(this).data('destino');
        const vagasDisponiveis = parseInt($(`.vagas-disponiveis[data-destino="${destino}"]`).text());
        
        if (vagasDisponiveis > 0) {
            $('#viagem-destino').val(destino);
            $('#viagem-popup').show();
        } else {
            alert('Desculpe, não há mais vagas disponíveis para esta viagem.');
        }
    });

    // Fechar pop-up de viagem
    $('#fechar-viagem-popup').click(function() {
        $('#viagem-popup').hide();
    });

    // Enviar formulário de cadastro para viagem
    $('#viagem-form').submit(function(e) {
        e.preventDefault();
        const destino = $('#viagem-destino').val();
        const nome = $('#viagem-nome').val();
        const cpf = $('#viagem-cpf').val();
        const telefone = $('#viagem-telefone').val();
        const quantidade = parseInt($('#viagem-quantidade').val());

        // Simular envio bem-sucedido
        console.log(`Reserva para ${destino}: ${nome}, ${cpf}, ${telefone}, ${quantidade} vagas`);

        // Atualizar contador de vagas disponíveis
        const vagasElement = $(`.vagas-disponiveis[data-destino="${destino}"]`);
        let vagasDisponiveis = parseInt(vagasElement.text());
        vagasDisponiveis -= quantidade;
        
        if (vagasDisponiveis < 0) {
            alert('Desculpe, não há vagas suficientes para esta reserva.');
            return;
        }
        
        vagasElement.text(vagasDisponiveis);

        // Desabilitar o botão se não houver mais vagas
        if (vagasDisponiveis === 0) {
            $(`.comprar-passagem[data-destino="${destino}"]`).prop('disabled', true);
        }

        // Fechar pop-up e limpar formulário
        $('#viagem-popup').hide();
        $('#viagem-form')[0].reset();

        // Mostrar mensagem de sucesso
        alert('Reserva realizada com sucesso!');
    });

    // Validação do CPF
    $('#viagem-cpf').on('input', function() {
        let cpf = $(this).val();
        cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        $(this).val(cpf);
    });

    // Validação do telefone
    $('#viagem-telefone').on('input', function() {
        $(this).val(formatarTelefone($(this).val()));
    });

    // Abrir pop-up de compra de produto
    $('.comprar-produto').click(function() {
        const produto = $(this).data('produto');
        const preco = $(this).data('preco');
        $('#produto-nome').val(produto);
        $('#produto-preco').val(preco);
        $('#compra-popup').show();
    });

    // Fechar pop-up de compra
    $('#fechar-compra-popup').click(function() {
        $('#compra-popup').hide();
        $('#compra-form')[0].reset();
        $('#dados-cartao').hide();
    });

    // Mostrar/esconder campos de cartão de crédito
    $('input[name="pagamento"]').change(function() {
        if ($(this).val() === 'cartao') {
            $('#dados-cartao').show();
        } else {
            $('#dados-cartao').hide();
        }
    });

    // Enviar formulário de compra
    $('#compra-form').submit(function(e) {
        e.preventDefault();
        const produto = $('#produto-nome').val();
        const preco = $('#produto-preco').val();
        const nome = $('#compra-nome').val();
        const telefone = $('#compra-telefone').val();
        const cep = $('#compra-cep').val();
        const rua = $('#compra-rua').val();
        const bairro = $('#compra-bairro').val();
        const numero = $('#compra-numero').val();
        const pagamento = $('input[name="pagamento"]:checked').val();

        // Simular envio bem-sucedido
        console.log(`Compra de ${produto} (R$ ${preco}): ${nome}, ${telefone}, ${cep}, ${rua}, ${bairro}, ${numero}, Pagamento: ${pagamento}`);

        if (pagamento === 'cartao') {
            const cartaoNumero = $('#cartao-numero').val();
            const cartaoNome = $('#cartao-nome').val();
            const cartaoValidade = $('#cartao-validade').val();
            const cartaoCVV = $('#cartao-cvv').val();
            console.log(`Dados do cartão: ${cartaoNumero}, ${cartaoNome}, ${cartaoValidade}, ${cartaoCVV}`);
        }

        // Fechar pop-up e limpar formulário
        $('#compra-popup').hide();
        $('#compra-form')[0].reset();
        $('#dados-cartao').hide();

        // Mostrar mensagem de sucesso
        alert('Compra realizada com sucesso!');
    });

    // Validação do telefone
    $('#compra-telefone').on('input', function() {
        $(this).val(formatarTelefone($(this).val()));
    });

    // Validação do CEP
    $('#compra-cep').on('input', function() {
        let cep = $(this).val();
        cep = cep.replace(/\D/g, '');
        if (cep.length > 8) {
            cep = cep.slice(0, 8);
        }
        if (cep.length > 5) {
            cep = `${cep.slice(0, 5)}-${cep.slice(5)}`;
        }
        $(this).val(cep);
    });

    // Validação do número do cartão
    $('#cartao-numero').on('input', function() {
        let numero = $(this).val();
        numero = numero.replace(/\D/g, '');
        if (numero.length > 16) {
            numero = numero.slice(0, 16);
        }
        numero = numero.replace(/(\d{4})(?=\d)/g, '$1 ');
        $(this).val(numero);
    });

    // Validação da validade do cartão
    $('#cartao-validade').on('input', function() {
        let validade = $(this).val();
        validade = validade.replace(/\D/g, '');
        if (validade.length > 4) {
            validade = validade.slice(0, 4);
        }
        if (validade.length > 2) {
            validade = `${validade.slice(0,2)}/${validade.slice(2)}`;
        }
        $(this).val(validade);
    });

    // Validação do CVV do cartão
    $('#cartao-cvv').on('input', function() {
        let cvv = $(this).val();
        cvv = cvv.replace(/\D/g, '');
        if (cvv.length > 3) {
            cvv = cvv.slice(0, 3);
        }
        $(this).val(cvv);
    });
});