(function(){
	var pingoNumber = $('#pingo-number');
	var startButton = $('#start-button');
	var resetButton = $('#reset-button');
	var historiesDiv = $('#histories')
	var drumAudio = $('#drum').get(0);
	
	// init histories
	var toBingoString = function(n){
		if(n > 9) {
			return n.toString(10);
		} else if (n < 0) {	
			return '00'
		} else {
			return '0' +  n.toString(10);
		}
	}
	var addHistory = function(n) {
		historiesDiv.append('<div class="col-md-1"><p class="history-number">' + toBingoString(n) + '</p></div>')
	};
	
	// init number list and storage
	var numberListAll = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
	var storage = localStorage;
	var listKey = 'partybingo.numberlist';
	var removedKey = 'partybingo.removedlist';
	var setNumberList = function(a) {
		storage.setItem(listKey, JSON.stringify(a));
	};
	var getNumberList = function() {
		return JSON.parse(storage.getItem(listKey));
	};
	var setRemovedList = function(a) {
		storage.setItem(removedKey, JSON.stringify(a));
	};
	var getRemovedList = function() {
		return JSON.parse(storage.getItem(removedKey));
	};
	var resetLists = function() {
		setNumberList(numberListAll.concat());
		setRemovedList([]);
	};
	
	// create initial list or loadHistory
	var loadedNumberList = getNumberList();
	var loadedRemovedList = getRemovedList();
	if(loadedNumberList && loadedRemovedList) {
		for (var i = 0; i < loadedRemovedList.length; i++) {
			addHistory(loadedRemovedList[i]);
		}
	} else {
		resetLists();
	} 

	// create util method
	var getNumberRamdom = function(){
		var numberList = getNumberList();
		var i = Math.floor(Math.random() * numberList.length);
		return numberList[i];
	}
	var removeNumberRamdom = function(){
		var numberList = getNumberList();
		if(numberList.length === 0) {
			return -1;
		}
		var i = Math.floor(Math.random() * numberList.length);
		var removed = numberList[i];
		numberList.splice(i, 1);
		setNumberList(numberList);
		var removedList = getRemovedList();
		removedList.push(removed);
		setRemovedList(removedList)
		return removed;
	}
	
	// init start button
	var isStarted = false;
	function rourletto() {
		if(isStarted) {
			pingoNumber.text(toBingoString(getNumberRamdom()));
			setTimeout(rourletto, 60);
		}
	} 
	var stop = function(time) {
		isStarted = false;
		startButton.text('Start');
		var n = removeNumberRamdom();
		pingoNumber.text(toBingoString(n));
		addHistory(n);
		drumAudio.pause();
	};
	var start = function(){
		isStarted = true;
		startButton.text('Stop');
		drumAudio.currentTime = 0; 
		drumAudio.play();
		rourletto();
	};
	var startClicked = function(e){
		if(isStarted) {
			stop(null);
		} else {
			start();
		}
	};
	startButton.click(startClicked); // button
	startButton.focus();
	
	// init reset button
	var resetClicked = function() {
		if (confirm('Do you really want to reset?')) {
			resetLists();
			pingoNumber.text('00');
			historiesDiv.empty();
			drumAudio.pause();
			startButton.focus();
		}
	};
	resetButton.click(resetClicked);
	
})()