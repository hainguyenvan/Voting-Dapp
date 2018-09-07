var ROOT_API = 'http://192.168.109.134:3002/api';

var API_GET_ACCCOUNTS = ROOT_API + '/accounts';
var API_GET_CANDIDATES = ROOT_API + '/candidates';


var app = angular.module('appVoting', []);
app.controller('ctrlVoting', function ($scope, $http) {

    $scope.isLoading = false;
    $scope.selectedAccount = null;

    $scope.account = null;
    $scope.accounts = [];

    $scope.candidateId;
    $scope.candidates = [];

    $scope.candidateName = null;

    $scope.init = function () {
        $scope.getAccounts();
        $scope.getCandidates();
    }

    $scope.onLogin = function () {
        $scope.account = $scope.selectedAccount;
    }

    $scope.onSignOut = function () {
        $scope.account = null;
        $scope.selectedAccount = null;
    }

    $scope.getAccounts = function () {
        $http({
            url: API_GET_ACCCOUNTS,
            method: "GET",
        }).then(function (res) {
            $scope.accounts = [];
            res.data.accounts.forEach(data => {
                let item = {
                    address: data
                };
                $scope.accounts.push(item);
            });
        }, function (err) {
            // failed
            console.log('Failed !', err);
        });
    }

    $scope.getCandidates = function () {
        $http({
            url: API_GET_CANDIDATES,
            method: "GET",
        }).then(function (res) {
            $scope.candidates = res.data.candidates;
        }, function (err) {
            // failed
            console.log('Failed !', err);
        });
    }

    $scope.addCandidate = function () {
        var candidate = {
            name: $scope.candidateName
        }
        console.log(candidate);
        // $http({
        //         url: API_ADD_TRANSACTIONS,
        //         method: "POST",
        //         data: transactions
        //     })
        //     .then(function (res) {
        //             // success
        //             $scope.getMiner();
        //         },
        //         function (res) {
        //             // failed
        //             console.log('Failed !');
        //         });
        // console.log('Transactions: ', transactions);
    }
});