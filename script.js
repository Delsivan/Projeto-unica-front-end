$(document).ready(function(){

    $("#inputChangePassword").click(function(){
        let inputPassword = $("input")[1];
 
        inputPassword.type = inputPassword.type == "text" ? "password" : "text";
    });

    maskCPFCNPJ();

    maskCEP();

    let form = $( "#registerForm");
    form.validate({
        errorElement: 'span',
        rules: {
            cpf_cnpj: {
                cpf_cnpj: true
            },
        },
    });

    form.on('submit', (e) => {
        e.preventDefault();
        if(form.valid())
        {
            alert('enviado')
        }
    })

 });

 function isValidCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

function isValidCNPJ(cnpj){
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

jQuery.validator.addMethod("cpf_cnpj", function(value, element) {

    if(value.length == 14){
        return this.optional(element) || isValidCPF(value);
    }
    return this.optional(element) || isValidCNPJ(value);  
}, 'Informe um documento Válido')

function maskCPFCNPJ() {
    const options =  {
        onKeyPress: function(cpf, e, field, options) {
        var masks = ['000.000.000-009', '00.000.000/0000-00'];
        var mask = (cpf.length > 14) ? masks[1] : masks[0];
        $('#cpf_cnpj').mask(mask, options);
    }};
      
    $('#cpf_cnpj').mask('000.000.000-09', options);
}

function maskCEP() {
    const options =  {
        onKeyPress: function(cep, e, field, options) {
          var masks = ['00000-000', '0-00-00-00'];
          var mask = (cep.length > 7) ? masks[1] : masks[0];
          $('#cep').mask(mask, options);
      }};
      
      $('#cep').mask('00000-000', options);
    
}




