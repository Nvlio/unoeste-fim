var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState } from "react";

function LoginUser(props) {
    var mainScreen = { border: '1px solid black', background: 'white', margin: '120px 20% 20px 20%', textAlign: 'center' };
    var title = { fontSize: "50", color: 'black' };
    var formScreen = { textAlign: 'left', border: '1px solid black', borderRadius: "10px", padding: '30px', margin: '50px 20% 20px 20%', background: "rgb(199, 199, 190)" };
    var field = { size: '100px', padding: '10px', margin: '5px 0px 5px 0px', width: '90%' };
    var botao = { width: '100px', background: 'blue', margin: "3px 0px 10px 0px", padding: '1%', border: '3px solid hsl(240, 72%, 16%)', color: 'white', fontSize: '15px', borderRadius: '10px', display: 'justify' };

    var _useState = useState({ email: "email", senha: "senha" }),
        _useState2 = _slicedToArray(_useState, 2),
        user = _useState2[0],
        setUser = _useState2[1];

    function Enviar(e) {
        console.log(user);
    }

    return React.createElement(
        'div',
        { style: mainScreen },
        React.createElement(
            'h1',
            { style: title },
            'Login Usuario'
        ),
        React.createElement(
            'div',
            { style: formScreen },
            React.createElement(
                'form',
                null,
                React.createElement(
                    'p',
                    null,
                    'Escreva seu email'
                ),
                React.createElement('input', { style: field, type: 'email', placeholder: 'EmailExemplo@gmail.com', name: 'email', onChange: function onChange(e) {
                        setUser(function (prevState) {
                            return Object.assign({}, prevState, { email: e.target.value });
                        });
                    } }),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    'Escreva sua senha'
                ),
                React.createElement('input', { style: field, type: 'password', placeholder: 'Coloque sua senha aqui!', name: 'senha' })
            )
        ),
        React.createElement(
            'button',
            { style: botao,
                onMouseOver: function onMouseOver(e) {
                    e.target.style.background = "hsl(240, 49%, 30%)", e.target.style.cursor = 'pointer';
                },
                onMouseOut: function onMouseOut(e) {
                    e.target.style.background = botao.background, e.target.style.cursor = botao.cursor;
                },
                onClick: function onClick(e) {
                    Enviar(e);
                } },
            'Logar'
        )
    );
}

elemDOM = document.querySelector('#Formulario');
ReactDOM.render(React.createElement(LoginUser, null), elemDOM);