// Sorted list data structure
// The elements of the list are stored in order inside array
// Insertions and deletions are completed by first doing a binary search for the correct index
// If the sort key of an object is to be changed, first remove it from the list, change the key, and then place it back in the list
// Additionally, a dictionary from keys to objects is maintained for quick lookups by key only

function jSortedList(keyFunction, compareFunction) {
    this.array = [];
    this.keyFunction = keyFunction
    this.compareFunction = compareFunction;
    this.lookupDict = {};
};

// Returns the index of an element in the array, or the index where it could be inserted
jSortedList.prototype.binarySearch = function(needle) {
    var left = 0;
    var right = this.array.length;
    var middle;
    while (right > left) {
        middle = Math.floor((left + right) / 2);
        var result = this.compareFunction(this.array[middle], needle);
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
    var location = this.binarySearch(key);
    this.array.splice(location, 0, obj);
    if (key in this.lookupDict) {
        this.lookupDict[key].append(obj);
    } else {
        this.lookupDict[key] = [obj];
    }
};

jSortedList.prototype.removeByKey = function(key) {
    if (key in this.lookupDict) {
        var location = this.binarySearch(key);
        this.array.splice(location, 1);
        this.lookupDict[key].pop();
        if (this.lookupDict[key].length == 0) {
            delete this.lookupDict[key];
        }
    }
};

jSortedList.prototype.remove = function(obj) {
    var key = this.keyFunction(obj);
    if (key in this.lookupDict) {
        var location = this.binarySearch(key);
        this.array.splice(location, 1);
        this.lookupDict[key].pop();
        if (this.lookupDict[key].length == 0) {
            delete this.lookupDict[key];
        }
    }
};

jSortedList.prototype.lookupByKey = function(key) {
    if (key in this.lookupDict) {
        if (this.lookupDict[key].length > 0) {
            return this.lookupDict[key][0];
        }
    }
    return null;
}
