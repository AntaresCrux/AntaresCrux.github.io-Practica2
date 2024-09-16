$(document).ready(function() {
    // Función para generar el RFC
    $('#rfcForm').submit(function(event) {
        event.preventDefault();
        
        let nombre = $('#nombre').val().trim().toUpperCase();
        let apellidoPaterno = $('#apellidoPaterno').val().trim().toUpperCase();
        let apellidoMaterno = $('#apellidoMaterno').val().trim().toUpperCase();
        let fechaNacimiento = $('#fechaNacimiento').val();
        
        let rfc = generarRFC(nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento);
        $('#resultadoRFC').text(`${rfc}`);
    });

    // Lógica de generación del RFC
    function generarRFC(nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento) {
        let rfc = '';
        rfc += apellidoPaterno.substring(0, 2);
        rfc += apellidoMaterno.substring(0, 1);
        rfc += nombre.substring(0, 1);
        
        let fecha = new Date(fechaNacimiento);
        let year = fecha.getFullYear().toString().substring(2, 4);
        let month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        let day = fecha.getDate().toString().padStart(2, '0');
        
        rfc += year + month + day;
        
        return rfc.toUpperCase();
    }

    // Función para consumir API con un ID dinámico
    $('#apiButton').click(function() {
        let userId = $('#userId').val();  // Obtener el ID del input

        if (userId) {
            $.get(`https://jsonplaceholder.typicode.com/users/${userId}`, function(data) {
                let userInfo = `
                    <p><strong>Nombre:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Teléfono:</strong> ${data.phone}</p>
                `;
                $('#apiResult').html(userInfo);
            }).fail(function() {
                $('#apiResult').text('Usuario no encontrado.');
            });
        } else {
            $('#apiResult').text('Ingrese un ID válido.');
        }
    });
});
