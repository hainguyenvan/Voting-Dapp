var ROOT_API = 'http://192.168.109.134:3002/api';

var API_GET_ACCCOUNTS = ROOT_API + '/accounts';
var API_GET_CANDIDATES = ROOT_API + '/candidates';
var API_ADD_CANDIDATE = ROOT_API + '/addCandidate';
var API_VOTE = ROOT_API + '/vote';


var app = angular.module('appVoting', []);
app.controller('ctrlVoting', function ($scope, $http) {
    vm = this;
    $scope.isLoading = false;
    $scope.selectedAccount = null;
    $scope.message = null;
    vm.abc = -1;
    $scope.account = null;
    $scope.accounts = [];

    $scope.candidateIdVote = -1;
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

    $scope.onClickAddCandidate = function () {
        if ($scope.account == undefined || $scope.account == undefined) {
            $scope.message = 'Please login your account !';
            $("#warning").modal();
            return;
        }
        $("#addCandidates").modal();
    }

    $scope.addCandidate = function () {
        var candidate = {
            name: $scope.candidateName,
            account: $scope.account
        }
        $http({
            url: API_ADD_CANDIDATE,
            method: "POST",
            data: candidate
        }).then(function (res) {
            // success
            $scope.getCandidates();
        }, function (err) {
            // failed
            console.log('Failed !', err);
        });
    }

    $scope.vote = function () {
        $scope.candidateIdVote = $('#candidatesSelect').val();
        var data = {
            id: Number($scope.candidateIdVote),
            account: $scope.account
        }

        $http({
            url: API_VOTE,
            method: "POST",
            data: data
        }).then(function (res) {
            // success
            $scope.getCandidates();
        }, function (err) {
            // failed
            console.log('Failed !', err);
        });
    }
});