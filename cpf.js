/*
 * Script para validação de CPF.
 * @autor Luiz Schmitt <lzschmitt@gmail.com>
 */

(function() {
    // pega todo input que esteja com a classe cpf
    var cpf = document.querySelectorAll("input.cpf");

    for(var i = 0; i < cpf.length; i++) {
        // não permite digitar mais de 11 caracteres
        cpf[i].setAttribute('maxlength', '11');
        // força o placeholder
        cpf[i].setAttribute('placeholder', '000.000.000-00');
        // cria o evento de keyup
        cpf[i].addEventListener('keyup', function(e) {
            // quando o cpf estiver completo
            if(e.target.value.length === parseInt(11)) {
                // verifica se é um cpf válido
                if( check(e.target.value) ) {
                    // seta as configurações
                    e.target.removeAttribute('data-invalid');
                    e.target.setAttribute('data-valid', true);
                    e.target.setAttribute('style', 'color:green');
                } else {
                    // seta as configurações
                    e.target.removeAttribute('data-valid');
                    e.target.setAttribute('data-invalid', true);
                    e.target.setAttribute('style', 'color:red')
                }
            } else if(e.target.value.length < 11){
                // remove as cores
                e.target.removeAttribute('style');
            }

            // faz a mascara no cpf
            e.target.value = mask(e.target.value);
        }, false);
    }
    /*
     * mask(cpf) - função responsável em por máscara no cpf
     * @autor Luiz Schmitt <lzschmitt@gmail.com>
     */
    function mask(cpf){
        return cpf.replace(/\D/g,"").replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g,"$1.$2.$3-$4");
    }

    /*
     * check(cpf) - função responsável em verificar se o cpf é válido.
     * @autor Luiz Schmitt <lzschmitt@gmail.com>
     */
    function check(cpf) {
        // matriz para calculo
        var x   = [11,10,9,8,7,6,5,4,3,2];
        // soma
        var y   = 0;
        // resto
        var r   = 0;

        // regex
        const regex = /[0]{9}\d{1}\d{1}|[1]{9}\d{1}\d{1}|[2]{9}\d{1}\d{1}|[3]{9}\d{1}\d{1}|[4]{9}\d{1}\d{1}|[5]{9}\d{1}\d{1}|[6]{9}\d{1}\d{1}|[7]{9}\d{1}\d{1}|[8]{9}\d{1}\d{1}|[9]{9}\d{1}\d{1}/g;

        // remove os pontos e tracos
        var cpf = cpf.replace(/[\.-]/g,'');

        // proibe o uso de valores iguais
        if(regex.exec(cpf) !== null) {
            return false;
        }

        // pegar o primeiro digito verificador
        var dv1 = cpf[cpf.length-2];
        // pegar o segundo digito verificador
        var dv2 = cpf[cpf.length-1];

        // faz um loop para fazer o calculo em dv1 e dv2
        for(var j = 0; j<=1; j++) {
            // zera as variaveis
            y = 0;
            r = 0;
            // faz um loop para calcular o dv atual
            for(i = 0; i <= cpf.length-2; i++) {
                // se for dv1 usa 9 digitos da matriz do cpf, dv2 usa a matriz completa
                cpf_c = (j == 0) ? parseInt(cpf[i-1]) : parseInt(cpf[i]);
                // garante não ser string
                if(!isNaN(cpf_c)) {
                    // faz a soma total da multiplicacao
                    y += cpf_c * parseInt(x[i]);
                }
            }

            // pega o resto
            r = (y*10)%11;
            // se resto for 10 ou 11 entao precisa retornar 0.
            r = (r == 10) || (r == 11) ? 0 : r;

            // verifica se os dv estao corretos e mostra o retorno
            if(dv1 == r) {
                continue;
            } else {
                if(dv2 != r) {
                    return false;
                }
            }
        }
        // cpf é válido
        return true;
    };
})();
