function CadsWork(props) {

    var mainScreen = { border: '1px solid black', background: 'white', margin: '120px 20% 20px 20%', textAlign: 'center' };
    var title = { fontSize: "50px", color: 'black' };
    var formScreen = { textAlign: 'left', border: '1px solid black', borderRadius: "10px", padding: '30px', margin: '50px 20% 20px 20%', background: "rgb(199, 199, 190)" };
    var field = { size: '100px', padding: '10px', margin: '5px 0px 5px 0px', width: '90%' };
    var botao = { width: '100px', background: 'blue', margin: "3px 0px 10px 0px", padding: '1%', border: '3px solid hsl(240, 72%, 16%)', color: 'white', fontSize: '15px', borderRadius: '10px', display: 'justify' };
    var screenExtra = { border: '1px solid black', borderRadius: "10px", background: "rgb(240, 240, 240)", padding: '10px', marginRight: '20px' };

    return React.createElement(
        'div',
        { style: mainScreen },
        React.createElement(
            'h1',
            { style: title },
            'Cadastro Funcion\xE1rio'
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
                    'Escreva seu nome'
                ),
                React.createElement('input', { style: field, type: 'text', placeholder: 'Nome', name: 'nome' }),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    'data de Nascimento'
                ),
                React.createElement('input', { style: field, type: 'date', name: 'aniversario' }),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    'Escreva seu email'
                ),
                React.createElement('input', { style: field, type: 'email', placeholder: 'EmailExemplo@gmail.com', name: 'email' }),
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { style: screenExtra },
                    React.createElement(
                        'p',
                        null,
                        'Coloque seu c\xF3digo'
                    ),
                    React.createElement('input', { style: field, type: 'senha', placeholder: 'seu c\xF3digo', name: 'senha' }),
                    React.createElement('br', null),
                    React.createElement(
                        'p',
                        null,
                        'Confirme seu codigo'
                    ),
                    React.createElement('input', { style: field, type: 'senha', placeholder: 'confirme seu c\xF3digo', name: 'senha' }),
                    React.createElement('br', null)
                ),
                React.createElement(
                    'p',
                    null,
                    'seu telefone'
                ),
                React.createElement('input', { style: field, type: 'tel', placeholder: 'Celular', name: 'celular' })
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
                onClick: function onClick() {
                    alert('me tocaram sem consentimento!!');
                } },
            'Logar'
        )
    );
}

elemDOM = document.querySelector('#Formulario');
ReactDOM.render(React.createElement(CadsWork, null), elemDOM);