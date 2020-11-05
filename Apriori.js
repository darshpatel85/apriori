// Apriori.js
var _testDB = [
    'cheese, Butter, water, bread, umbrella',
    'Butter, water',
    'cheese, Butter, milk',
    'Butter, cheese, detergent',
    'cheese, milk, beer'
];

var _db = [];

$(function () {
    SetControlBehaviors();
    $('#ClearDBButton').click();
    $('#ItemsTextBox').focus();
});

///////////////////
// Helper Methods

function SetControlBehaviors() {
    // Set generate-db-button behavior


    // Set reset-db-button behavior
    $('#DefaultDBButton').click(function () {
        _db = [];
        _testDB.forEach(i => _db.push(i));

        $('#DBTextBox').val(_db.join('\n'));
    });
    $('#ClearDBButton').click(function(){
        $('#DBTextBox').val('');
    })
    // Set apriori-button behavior
    $('#AprioriButton').click(function () {
        // Create ItemsetCollection for current db
        _db = [];
        let transCount = parseInt($.trim($('#TransCountTextBox').val()));
        let items = $('#DBTextBox').val();
        let itm = items.split('\n');
        for(i in itm){
            _db.push(itm[i]);
        }
        
        
        $('#DBTextBox').val(_db.join('\n'));
        let db = new ItemsetCollection();
        for (var i in _db) {
            let items = _db[i].split(', ');
            db.push(Itemset.from(items));
        }

        // Step1: Find large itemsets for given support threshold
        let supportThreshold = parseFloat($.trim($('#SupportThresholdTextBox').val()));
        let L = AprioriMining.doApriori(db, supportThreshold);

        ClearResult();
        AddResultLine(L.join('\n'));
        AddResultLine('');


    });
}


function AddResultLine(text) {
    $('#ResultTextBox').val($('#ResultTextBox').val() + text + '\n');
}

function ClearResult(text) {
    $('#ResultTextBox').val('');
}
