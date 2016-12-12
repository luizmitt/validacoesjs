/*
 * Script para validação de cnpj.
 * @autor Luiz Schmitt <lzschmitt@gmail.com>
 */

(function() {
    // pega todo input que esteja com a classe cnpj
    var cnpj = document.querySelectorAll("input.cnpj");

    for(var i = 0; i < cnpj.length; i++) {
        // não permite digitar mais de 11 caracteres
        cnpj[i].setAttribute('maxlength', '14');
        // força o placeholder
        cnpj[i].setAttribute('placeholder', '00.000.000/0000-00');
        // cria o evento de keyup
        cnpj[i].addEventListener('keyup', function(e) {
            // quando o cnpj estiver completo
            if(e.target.value.length === parseInt(14)) {
                // verifica se é um cnpj válido
                if( check(e.target.value) ) {
                    // seta as configurações
                    e.target.removeAttribute('data-invalid');
                    e.target.setAttribute('data-valid', true);
                    e.target.setAttribute('style', 'color:green');
                } else {
                    // seta as configurações
                    e.target.removeAttribute('data-valid');
                    e.target.setAttribute('data-invalid', true);
                    e.target.setAttribute('style', 'color:red');
                }
            } else if(e.target.value.length < 14){
                // remove as cores
                e.target.removeAttribute('style');
            }

            // faz a mascara no cnpj
            e.target.value = mask(e.target.value);
        }, false);
    }
    /*
     * mask(cnpj) - função responsável em por máscara no cnpj
     * @autor Luiz Schmitt <lzschmitt@gmail.com>
     */
    function mask(cnpj){
        return cnpj.replace(/\D/g,"").replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5");
    }

    /*
     * check(cnpj) - função responsável em verificar se o cnpj é válido.
     * @autor Luiz Schmitt <lzschmitt@gmail.com>
     */
    function check(cnpj) {
        // matriz para calculo
        var x   = [6,5,4,3,2,9,8,7,6,5,4,3,2];
        // soma
        var y   = 0;
        // resto
        var r   = 0;

        // remove os pontos e tracos
        var cnpj = cnpj.replace(/[\.\/-]/g,'');

        // pegar o primeiro digito verificador
        var dv1 = cnpj[cnpj.length-2];
        // pegar o segundo digito verificador
        var dv2 = cnpj[cnpj.length-1];

        // faz um loop para fazer o calculo em dv1 e dv2
        for(var j = 0; j<=1; j++) {
            // zera as variaveis
            y = 0;
            r = 0;
            // faz um loop para calcular o dv atual
            for(i = 0; i <= cnpj.length-2; i++) {
                // se for dv1 usa 9 digitos da matriz do cnpj, dv2 usa a matriz completa
                cnpj_c = (j == 0) ? parseInt(cnpj[i-1]) : parseInt(cnpj[i]);
                // garante não ser string
                if(!isNaN(cnpj_c)) {
                    // faz a soma total da multiplicacao
                    y += cnpj_c * parseInt(x[i]);
                }
            }

            // pega o resto
            r = (y%11);
            // se resto for menor que 2 entao precisa retornar 0.
            r = (r < 2) ? 0 : (11-r);

            // verifica se os dv estao corretos e mostra o retorno
            if(dv1 == r) {
                continue;
            } else {
                if(dv2 != r) {
                    return false;
                }
            }
        }
        // cnpj é válido
        return true;
    };
})();
