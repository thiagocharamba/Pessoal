
var app = angular.module('mainModule', []);
var testeLista = {};

google.load("visualization", "1", { packages: ["corechart"] });

app.controller("controllerMain", function ($scope, $http) {

    $scope.Sabores = {};
    $scope.ListaCompras = {};

    $scope.start = function(){
        $http.get("http://localhost:3000/carregarInformacoes").then(function(response) {

            $scope.ListaCompras = response.data.ListaCompras;
            $scope.Sabores = response.data.Sabores;

            if(!ValidarNull(response.data.Sabores) && !ValidarNull(response.data.ListaCompras))
                window.location.reload();

            CarregarGraficos($scope.ListaCompras, $scope.Sabores);
        });
    }

    $scope.selected = $scope.Sabores[0];

    $scope.ListaCompra = {};

    var ultimoIdCompras = 8;

    $scope.salvar = function () {
        if (ValidarNull($scope.ListaCompra.nome)) {
            if (ValidarNull($scope.selected)) {
                if ($scope.selected.estoque <= 0) {
                    alert('Produto esgotado no estoque.');
                } else {

                    var compra = { nome: $scope.ListaCompra.nome, shakeNome: $scope.selected.nome, pago: $scope.ListaCompra.pago ? 'Sim' : 'Não', dataHora: new Date().toLocaleString(), id: ++ultimoIdCompras };

                    var req = {
                        method: 'POST',
                        url: 'http://localhost:3000/NovoPedido',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: compra
                    }

                    $http(req).then(function(response){

                                        $scope.ListaCompras = response.data.ListaCompras;
                                        $scope.Sabores = response.data.Sabores;
                                        CarregarGraficos($scope.ListaCompras, $scope.Sabores);
                                        alert('Salvo com sucesso.');
                                        $scope.ListaCompra = [];
                                        $scope.selected = $scope.Sabores[0];
                                        window.location.reload();
                                    }, 
                                    function(response){
                                        window.location.reload();
                                    });
                }
            } else {
                $("#shake-novo").css('background', '#4285f4');
            }

        } else {
            $("#cliente-novo").css('background-color', '#4285f4');
        }
    }

    $scope.excluir = function (item) {

        if (confirm("Deseja remover?")) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/ExcluirPedido',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: item
            }

            $http(req).then(function(response){

                                $scope.ListaCompras = response.data.ListaCompras;
                                $scope.Sabores = response.data.Sabores;
                                CarregarGraficos($scope.ListaCompras, $scope.Sabores);                                
                                $scope.selected = $scope.Sabores[0];
                                window.location.reload();
                            }, 
                            function(response){
                                window.location.reload();
                            });
        }
    }

    $scope.limparCampoText = function () {
        $("#cliente-novo").css('background-color', '#FFFFFF');
    }

    $scope.limparCampoSelect = function () {
        $("#shake-novo").css('background', '#FFFFFF');
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