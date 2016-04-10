
var app = angular.module('mainModule', []);

google.load("visualization", "1", { packages: ["corechart"] });

app.controller("controllerMain", function ($scope) {

    $scope.Sabores = [{ nome: 'Chocolate', estoque: 20, saida: 2, id: 1 },
                      { nome: 'Cookies', estoque: 12, saida: 1, id: 2 },
                      { nome: 'Morango', estoque: 26, saida: 1, id: 3 },
                      { nome: 'Mokaccino', estoque: 20, saida: 1, id: 4 },
                      { nome: 'Creme', estoque: 19, saida: 0, id: 5 },
                      { nome: 'Maracujá', estoque: 3, saida: 1, id: 6 },
                      { nome: 'Doce de Leite', estoque: 16, saida: 1, id: 7 },
                      { nome: 'Frutas Tropicais', estoque: 15, saida: 0, id: 8 },
                      { nome: 'Paçoca', estoque: 6, saida: 1, id: 9 }];

    $scope.selected = $scope.Sabores[0];

    $scope.ListaCompra = {};

    $scope.ListaCompras = [{ nome: 'Thiago Charamba', shakeNome: 'Chocolate', pago: 'Sim', dataHora: '11/29/2015, 3:24:08 PM', id: 1 },
                      { nome: 'Alexandre Ferrera', shakeNome: 'Paçoca', pago: 'Sim', dataHora: '10/29/2015, 3:24:08 PM', id: 2 },
                      { nome: 'Amanda Holanda', shakeNome: 'Cookies', pago: 'Não', dataHora: '10/29/2015, 3:24:08 PM', id: 3 },
                      { nome: 'Gerardo Severiano', shakeNome: 'Mokaccino', pago: 'Sim', dataHora: '10/29/2015, 3:24:08 PM', id: 4 },
                      { nome: 'Ramiro Gravato', shakeNome: 'Morango', pago: 'Não', dataHora: '10/29/2015, 3:24:08 PM', id: 5 },
                      { nome: 'Epaminondas Cidreira', shakeNome: 'Chocolate', pago: 'Não', dataHora: '10/29/2015, 3:24:08 PM', id: 6 },
                      { nome: 'Tobias Lage', shakeNome: 'Doce de Leite', pago: 'Sim', dataHora: '11/29/2015, 3:24:08 PM', id: 7 },
                      { nome: 'Zeferino Villela', shakeNome: 'Maracujá', pago: 'Sim', dataHora: '11/29/2015, 3:24:08 PM', id: 8 }];

    var ultimoIdCompras = 8;

    $scope.salvar = function () {
        if (ValidarNull($scope.ListaCompra.nome)) {
            if ($scope.selected.estoque <= 0) {
                alert('Produto esgotado no estoque.');
            } else {
                $scope.ListaCompras.push({ nome: $scope.ListaCompra.nome, shakeNome: $scope.selected.nome, pago: $scope.ListaCompra.pago ? 'Sim' : 'Não', dataHora: new Date().toLocaleString(), id: ++ultimoIdCompras });

                $scope.selected.saida++;
                $scope.selected.estoque--;
                CarregarGraficos($scope.ListaCompras, $scope.Sabores);
                alert('Salvo com sucesso.');
				$scope.ListaCompra = [];
            }

        } else {
            $("#cliente-novo").css('background-color', '#4285f4');
        }
    }

    $scope.excluir = function (item) {

        if (confirm("Deseja remover?")) {
            var index = $scope.ListaCompras.indexOf(item);
            if (index != -1) {
                $scope.ListaCompras.splice(index, 1);

                angular.forEach($scope.Sabores, function (value, key) {

                    if (item.shakeNome == value.nome) {
                        value.saida--;
                        value.estoque++;
                    }
                });

                CarregarGraficos($scope.ListaCompras, $scope.Sabores);
            }
        }
    }

    $scope.limparCampo = function () {
        $("#cliente-novo").css('background-color', '#FFFFFF');
    }

    $scope.carregarGraficos = function () {
        CarregarGraficos($scope.ListaCompras, $scope.Sabores);
    }
});

function ValidarNull(item) {
    if (item == "" || item == undefined || item == null)
        return false;
    else
        return true;
}

function CarregarGraficos(dadoVenda, dadoEstoque) {
    PieChart(dadoEstoque);
    ColumnChart1(dadoVenda);
    ColumnChart2(dadoEstoque)
}

function PieChart(dadoEstoque) {

    var dado = [];
    dadoEstoque.forEach(function (item) {
        dado.push([item.nome, item.saida]);
    });

    var titulo = [['Shake', 'Quantidade']];
    titulo = titulo.concat(dado.sort());
    var data = google.visualization.arrayToDataTable(titulo);

    var options = {
        title: 'Total de Shakes vendidos por sabor'
    };

    var chart = new google.visualization.PieChart(document.getElementById('PieChart-grafico1'));
    chart.draw(data, options);
}

function ColumnChart1(dadoVenda) {

    var qtdSim = 0;
    var qtdNao = 0;

    dadoVenda.forEach(function (item) {
        if (item.pago == 'Sim')
            ++qtdSim;
        else if (item.pago == 'Não')
            ++qtdNao;
    });

    var titulo = [['Pago', 'Quantidade', { role: 'style' }], ['Sim', qtdSim, '#3366cc'], ['Não', qtdNao, '#dc3912']];
    var data = google.visualization.arrayToDataTable(titulo);

    var options = {
        title: "Pagamentos",
        bar: { groupWidth: "50%" },
        legend: { position: "none" },
    };

    chart = new google.visualization.ColumnChart(document.getElementById('ColumnChart-grafico2'));
    chart.draw(data, options);
}

function ColumnChart2(dadoEstoque) {

    var dado = [];
    dadoEstoque.forEach(function (item) {
        dado.push([item.nome, item.saida, item.estoque]);
    });

    var titulo = [['Estoque', 'Usado', 'Em estoque']];
    titulo = titulo.concat(dado.sort());
    var data = google.visualization.arrayToDataTable(titulo);

    var options = {
        title: 'Controle de estoque',
        chartArea: { width: '70%' },
        isStacked: true,
        hAxis: {
            title: 'Sabores',
            minValue: 0,
        }
    };

    chart = new google.visualization.ColumnChart(document.getElementById('ColumnChart-grafico3'));
    chart.draw(data, options);
}