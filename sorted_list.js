// Sorted list data structure
// The elements of the list are stored in order inside array
// Insertions and deletions are completed by first doing a binary search for the correct index
// If the sort key of an object is to be changed, first remove it from the list, change the key, and then place it back in the list
// Additionally, a dictionary from keys to objects is maintained for quick lookups by key only

function jSortedList(keyFunction, compareFunction) {
    this.array = [];
    this.keyFunction = keyFunction
    this.compareFunction = compareFunction;
    this.keyDict = {};
    this.nameDict = {};
    this.insertCallbacks = [];
    this.removeCallbacks = [];
};

// Returns the index of an element in the array, or the index where it could be inserted
jSortedList.prototype.binarySearch = function(needleKey) {
    var left = 0;
    var right = this.array.length;
    var middle;
    while (right > left) {
        middle = Math.floor((left + right) / 2);
        var result = this.compareFunction(this.keyFunction(this.array[middle]), needleKey);
        if (result < 0) {
            left = middle + 1;
        } else if (result > 0) {
            right = middle;
        } else {
            return middle;
        }
    }
    return left;
};

jSortedList.prototype.insert = function(obj) {
    var key = this.keyFunction(obj);
    key = key.toLowerCase();
    if (key in this.keyDict) {
        this.removeByKey(key);
    }
    var location = this.binarySearch(key);
    var isLast = location == this.array.length;
    this.array.splice(location, 0, obj);
    this.keyDict[key] = obj;
    this.nameDict[obj.nickname.toLowerCase()] = obj;
    for (var i = 0; i < this.insertCallbacks.length; i++) {
        this.insertCallbacks[i](obj, isLast ? null : this.array[location + 1]);
    }
};

jSortedList.prototype.removeByKey = function(key) {
    key = key.toLowerCase();
    if (key in this.keyDict) {
        var obj = this.keyDict[key];
        var location = this.binarySearch(key);
        this.array.splice(location, 1);
        var name = obj.nickname;
        name = name.toLowerCase();
        delete this.keyDict[key];
        delete this.nameDict[name];
        for (var i = 0; i < this.removeCallbacks.length; i++) {
            this.removeCallbacks[i](obj);
        }
    }
};

jSortedList.prototype.remove = function(obj) {
    var key = this.keyFunction(obj);
    key = key.toLowerCase();
    if (key in this.keyDict) {
        var location = this.binarySearch(key);
        this.array.splice(location, 1);
        var name = this.keyDict[key].nickname;
        name = name.toLowerCase();
        delete this.keyDict[key];
        delete this.nameDict[name];
        for (var i = 0; i < this.removeCallbacks.length; i++) {
            this.removeCallbacks[i](obj);
        }
    }
};

jSortedList.prototype.erase = function(callback) {
    var tempArray = this.array;
    this.array = [];
    this.keyDict = {};
    this.nameDict = {};
    for (var i = 0; i < tempArray.length; i++) {
        for (var j = 0; j < this.removeCallbacks.length; j++) {
            this.removeCallbacks[j](tempArray[i]);
        }
    }
};

jSortedList.prototype.lookupByName = function(name) {
    name = name.toLowerCase();
    if (name in this.nameDict) {
        return this.nameDict[name];
    }
    return null;
};

jSortedList.prototype.registerInsertCallback = function(callback) {
    this.insertCallbacks.push(callback);
};

jSortedList.prototype.unregisterInsertCallback = function(callback) {
    for (var i = 0; i < this.insertCallbacks.length; i++) {
        if (this.insertCallbacks[i] == callback) {
            this.insertCallbacks.splice(i, 1);
            return;
        }
    }
};

jSortedList.prototype.registerRemoveCallback = function(callback) {
    this.removeCallbacks.push(callback);
};

jSortedList.prototype.unregisterRemoveCallback = function(callback) {
    for (var i = 0; i < this.removeCallbacks.length; i++) {
        if (this.removeCallbacks[i] == callback) {
            this.removeCallbacks.splice(i, 1);
            return;
        }
    }
};

