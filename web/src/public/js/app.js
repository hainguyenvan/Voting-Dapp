var ROOT_API = 'http://192.168.109.134:3002/api';

var API_GET_ACCCOUNTS = ROOT_API + '/accounts';
var API_GET_CANDIDATES = ROOT_API + '/candidates';
var API_ADD_CANDIDATE = ROOT_API + '/addCandidate';
var API_VOTE = ROOT_API + '/vote';
var API_IS_VOTED_BY_ACCOUNT = ROOT_API + '/isVotedByAccount';


var app = angular.module('appVoting', []);
app.controller('ctrlVoting', function ($scope, $http) {

    $scope.isLoading = false;
    $scope.selectedAccount = null;
    $scope.message = null;
    $scope.account = null;
    $scope.accounts = [];

    $scope.candidateIdVote = -1;
    $scope.candidates = [];

    $scope.candidateName = null;
    $scope.isVoted = false;

    $scope.init = function () {
        $scope.getAccounts();
        $scope.getCandidates();
    }

    $scope.onLogin = function () {
        $scope.account = $scope.selectedAccount;
        $scope.isVotedByAccount($scope.account);
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
        if ($scope.candidateIdVote == undefined || Number($scope.candidateIdVote).toString() == 'NaN') {
            $scope.message = 'Please choice candidate your voting !';
            $("#warning").modal();
            return;
        }

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
            $scope.isVoted = true;
        }, function (err) {
            // failed
            console.log('Failed !', err);
        });
    }

    $scope.isVotedByAccount = function (account) {
        if (account == undefined) {
            return;
        }
        var body = {
            account: account
        }
        $http({
            url: API_IS_VOTED_BY_ACCOUNT,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            $scope.isVoted = res.data.voted;
        }, function (err) {
            // failed
            console.log('Failed !', err);
        });
    }
});