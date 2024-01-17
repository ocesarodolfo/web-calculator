var symbols = ['%','÷','+','-','x','(',')'];

$(document).ready(() => {
    $(document).on('keyup', (e) => {
        if(['=', 'Enter'].includes(e.key))
            calcular()
        else if(['Backspace'].includes(e.key))
            reset(1)
        else if(['Delete'].includes(e.key))
            reset()
        else if(e.key >= 0 || ['%','/','+','-','*','x','(',')','.'].includes(e.key))
            add_value(e.key, 1)
    })

    $('.nav li').click((e)=> {
        switch($(e.target).text()) {
            case 'Início':
                $('html, body').animate({
                    scrollTop: parseInt($("body").offset().top)
                }, 1000);
                break;
            case 'Sobre':
                $('html, body').animate({
                    scrollTop: parseInt($("footer").offset().top)
                }, 1000);
                break;
        }
    })
})

function add_value(value, option = 0) {
    var tela = $('#tela');
    var screen_value = tela.html().replace(/^0+/, '');

    if (option) {
        // Se a opção estiver ativada, substitua os caracteres de divisão e multiplicação
        value = value.replace('/', '÷').replace('*', '×');
    } else {
        // Se a opção não estiver ativada, obtenha o valor diretamente
        value = $(value).val() || '0';
        value = value.replace(/^0+/, '') || '0';
    }

    // Contagem de parênteses
    var openParentheses = (screen_value.match(/\(/g) || []).length;
    var closeParentheses = (screen_value.match(/\)/g) || []).length;
    
    if (!isNaN(screen_value.slice(-1)) && value === '(') {
        // Impede adicionar parêntese imediatamente após um número
        return;
    }

    if (symbols.includes(screen_value.slice(-1)) && value === '(') {

        tela.html(screen_value + value);

    } else if (symbols.includes(screen_value.slice(-1)) && symbols.includes(value)  && !['(',')'].includes(screen_value.slice(-1))) {
        
        if (openParentheses > closeParentheses && value === ')') {
            tela.html(screen_value + ')');
        } else {
            tela.html(screen_value.slice(0, -1) + value);
        }

    } else {
        tela.html(screen_value + value);
    }
}

function reset(type) {
    var data = $('#tela')
    if(type) {
        data.html(data.html().slice(0, -1) || '0')
    } else
        data.html(0)
}

function calcular() {
    var data = $('#tela').html().replace('÷', '/').replace('x', '*');
    $('#tela').html(eval(data).toFixed(2))
}