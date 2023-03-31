
# Checkout

Este es un proyecto que permite ingresar un número de tarjeta de crédito y obtener información sobre ella, como la marca, el tipo, el esquema y el emisor.


## Usage/Examples

- Ingresa el número de tu tarjeta de crédito.
- La información sobre la tarjeta se mostrará en la pantalla.


## Features

Este proyecto cuenta con varias funciones en JavaScript para validar el número de la tarjeta de crédito y obtener información sobre ella a través de una API.

La función updateCardNumber(event) se encarga de actualizar el número de la tarjeta en la pantalla y llamar a otras funciones para realizar la validación y obtener información adicional.

La función numberValidation(event) valida el número de la tarjeta de crédito ingresado por el usuario y lo formatea para que se muestre correctamente en pantalla. Además, llama a la función binCheck(bin) para obtener información adicional sobre la tarjeta.

La función binCheck(bin) utiliza una API externa para obtener información sobre la tarjeta, como la marca, el tipo, el esquema y el emisor. También llama a la función search4Logo(brand) para buscar el logotipo de la marca y mostrarlo en pantalla.

La función search4Logo(brand) utiliza otra API externa para buscar el logotipo de la marca y mostrarlo en pantalla.

La función cardStyle(brand, type, scheme, issuer) se encarga de aplicar estilos CSS al diseño de la tarjeta de crédito en función de la marca de la tarjeta.
## Contributing

Si quieres contribuir a este proyecto, puedes hacerlo a través de pull requests en Github.
## Authors

- [@araxielfenix](https://github.com/Araxielfenix)
